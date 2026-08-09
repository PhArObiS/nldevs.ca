import { NextRequest, NextResponse } from "next/server";

type AdminLeadUpdate = {
  id?: unknown;
  adminStatus?: unknown;
  adminTags?: unknown;
  adminNotes?: unknown;
};

const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
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
