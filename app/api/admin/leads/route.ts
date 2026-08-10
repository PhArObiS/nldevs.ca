import { NextRequest, NextResponse } from "next/server";

type AdminLeadUpdate = {
  id?: unknown;
  adminStatus?: unknown;
  adminTags?: unknown;
  adminNotes?: unknown;
};

type AdminLeadEmail = {
  id?: unknown;
  subject?: unknown;
  message?: unknown;
};

type LeadEmailRow = {
  id: string;
  name: string;
  email: string;
  email_confirmed: boolean | null;
};

const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
  "your-resend-api-key",
]);

const ADMIN_STATUSES = new Set([
  "new",
  "contacted",
  "playtester",
  "developer",
  "priority",
  "not_a_fit",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function getSupabaseRestUrl(value: string) {
  return value.replace(/\/+$/, "").replace(/\/rest\/v1$/, "") + "/rest/v1";
}

function getSupabaseHeaders(key: string, prefer = "return=representation") {
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: prefer,
  };

  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return headers;
}

function getConfig() {
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!adminToken) {
    return { error: "Admin access is not configured." };
  }

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return { error: "Member database is not configured." };
  }

  return { adminToken, supabaseUrl, serviceRoleKey };
}

function isAuthorized(request: NextRequest, adminToken: string) {
  return request.headers.get("authorization") === `Bearer ${adminToken}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFirstName(name: string) {
  return name.split(" ")[0] || "there";
}

export async function GET(request: NextRequest) {
  const config = getConfig();
  if ("error" in config) {
    return NextResponse.json({ error: config.error }, { status: 503 });
  }

  if (!isAuthorized(request, config.adminToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const select = [
    "id",
    "name",
    "email",
    "fortnite_name",
    "discord_name",
    "favorite_map",
    "member_goals",
    "developer_interest",
    "developer_role",
    "developer_portfolio",
    "developer_availability",
    "contact_consent",
    "age_attestation",
    "email_confirmed",
    "email_confirmed_at",
    "admin_status",
    "admin_tags",
    "admin_notes",
    "contacted_at",
    "last_reviewed_at",
    "created_at",
  ].join(",");

  const response = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?select=${select}&order=created_at.desc&limit=100`,
    {
      headers: getSupabaseHeaders(config.serviceRoleKey),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not load leads." },
      { status: 502 }
    );
  }

  return NextResponse.json({ leads: await response.json() });
}

export async function PATCH(request: NextRequest) {
  const config = getConfig();
  if ("error" in config) {
    return NextResponse.json({ error: config.error }, { status: 503 });
  }

  if (!isAuthorized(request, config.adminToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: AdminLeadUpdate;
  try {
    body = (await request.json()) as AdminLeadUpdate;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = cleanText(body.id, 80);
  const adminStatus = cleanText(body.adminStatus, 40) || "new";
  const adminTags = cleanText(body.adminTags, 240);
  const adminNotes = cleanText(body.adminNotes, 1000);

  if (!id) {
    return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
  }

  if (!ADMIN_STATUSES.has(adminStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const response = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(config.serviceRoleKey),
      body: JSON.stringify({
        admin_status: adminStatus,
        admin_tags: adminTags || null,
        admin_notes: adminNotes || null,
        contacted_at: adminStatus === "contacted" ? now : undefined,
        last_reviewed_at: now,
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not update lead." },
      { status: 502 }
    );
  }

  const rows = await response.json();
  return NextResponse.json({ lead: rows[0] });
}

export async function POST(request: NextRequest) {
  const config = getConfig();
  if ("error" in config) {
    return NextResponse.json({ error: config.error }, { status: 503 });
  }

  if (!isAuthorized(request, config.adminToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;
  const replyTo = process.env.WELCOME_EMAIL_REPLY_TO || "nldevsmtl@gmail.com";

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return NextResponse.json(
      { error: "Email sending is not configured." },
      { status: 503 }
    );
  }

  let body: AdminLeadEmail;
  try {
    body = (await request.json()) as AdminLeadEmail;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = cleanText(body.id, 80);
  const subject = cleanText(body.subject, 140);
  const message = cleanText(body.message, 2000);

  if (!id) {
    return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
  }

  if (subject.length < 3) {
    return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  }

  if (message.length < 5) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const lookup = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?select=id,name,email,email_confirmed&id=eq.${encodeURIComponent(id)}&limit=1`,
    {
      headers: getSupabaseHeaders(config.serviceRoleKey),
      cache: "no-store",
    }
  );

  if (!lookup.ok) {
    return NextResponse.json({ error: "Could not find lead." }, { status: 502 });
  }

  const leads = (await lookup.json()) as LeadEmailRow[];
  const lead = leads[0];

  if (!lead) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  const firstName = getFirstName(lead.name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [lead.email],
      subject,
      text: `Hi ${firstName},\n\n${message}\n\n- NLDEVS`,
      html: `
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>${safeMessage}</p>
        <p>- NLDEVS</p>
      `,
      reply_to: replyTo,
    }),
  });

  if (!emailResponse.ok) {
    return NextResponse.json(
      { error: "Could not send email." },
      { status: 502 }
    );
  }

  const now = new Date().toISOString();
  const update = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(config.serviceRoleKey),
      body: JSON.stringify({
        admin_status: "contacted",
        contacted_at: now,
        last_reviewed_at: now,
      }),
    }
  );

  if (!update.ok) {
    return NextResponse.json({ ok: true, warning: "Email sent, but lead status was not updated." });
  }

  const rows = await update.json();
  return NextResponse.json({ ok: true, lead: rows[0] });
}
