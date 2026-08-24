import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { defaultLocale, locales, LOCALE_META, type Locale } from "@/i18n/routing";

type AdminLeadUpdate = {
  id?: unknown;
  adminStatus?: unknown;
  adminTags?: unknown;
  adminNotes?: unknown;
  preferredEmailLocale?: unknown;
};

type AdminLeadEmail = {
  id?: unknown;
  subject?: unknown;
  message?: unknown;
  broadcast?: unknown;
  sourceLocale?: unknown;
  forceEnglish?: unknown;
  confirmBroadcast?: unknown;
};

type LeadEmailRow = {
  id: string;
  name: string;
  email: string;
  email_confirmed: boolean | null;
  signup_locale: string | null;
  preferred_email_locale: string | null;
  marketing_unsubscribed: boolean | null;
  marketing_unsubscribe_token_hash: string | null;
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

const localeSet = new Set<string>(locales);
const LOCALE_LABELS = Object.fromEntries(
  locales.map((locale) => [locale, LOCALE_META[locale].label])
) as Record<Locale, string>;
const ADMIN_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ADMIN_RATE_LIMIT_MAX_REQUESTS = 30;
const BROADCAST_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const BROADCAST_RATE_LIMIT_MAX_REQUESTS = 2;

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = globalThis as typeof globalThis & {
  __nldevsAdminRateLimit?: Map<string, RateEntry>;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultilineText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function cleanLocale(value: unknown) {
  if (value === "" || value === null || value === undefined) return null;
  return typeof value === "string" && localeSet.has(value) ? (value as Locale) : null;
}

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const store =
    rateLimitStore.__nldevsAdminRateLimit ?? new Map<string, RateEntry>();
  rateLimitStore.__nldevsAdminRateLimit = store;

  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequests;
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

  if (adminToken.length < 32 || PLACEHOLDER_KEYS.has(adminToken)) {
    return { error: "Admin access token is too weak." };
  }

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return { error: "Member database is not configured." };
  }

  return { adminToken, supabaseUrl, serviceRoleKey };
}

function isAuthorized(request: NextRequest, adminToken: string) {
  const authorization = request.headers.get("authorization") ?? "";
  const submitted = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  const submittedBytes = Buffer.from(submitted);
  const expectedBytes = Buffer.from(adminToken);

  if (submittedBytes.length !== expectedBytes.length) return false;
  return timingSafeEqual(submittedBytes, expectedBytes);
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

function createToken() {
  return randomBytes(32).toString("base64url");
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getRequestOrigin(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  if (host) return `${protocol}://${host}`;
  return "https://nldevs.ca";
}

function getUnsubscribeUrl(request: NextRequest, token: string) {
  const url = new URL("/api/player-leads/unsubscribe", getRequestOrigin(request));
  url.searchParams.set("token", token);
  return url.toString();
}

function getLeadLocale(lead: Pick<LeadEmailRow, "signup_locale" | "preferred_email_locale">) {
  return (
    cleanLocale(lead.preferred_email_locale) ||
    cleanLocale(lead.signup_locale) ||
    defaultLocale
  );
}

function buildBroadcastText({
  name,
  message,
  unsubscribeUrl,
}: {
  name: string;
  message: string;
  unsubscribeUrl: string;
}) {
  return `Hi ${getFirstName(name)},\n\n${message}\n\n- NLDEVS\n\nUnsubscribe: ${unsubscribeUrl}`;
}

function buildBroadcastHtml({
  name,
  message,
  unsubscribeUrl,
}: {
  name: string;
  message: string;
  unsubscribeUrl: string;
}) {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeUnsubscribeUrl = escapeHtml(unsubscribeUrl);

  return `
    <p>Hi ${escapeHtml(getFirstName(name))},</p>
    <p>${safeMessage}</p>
    <p>- NLDEVS</p>
    <p style="font-size:12px;color:#667085;">You are receiving this because you joined NLDEVS and allowed email updates. <a href="${safeUnsubscribeUrl}">Unsubscribe</a></p>
  `;
}

async function translateEmail({
  sourceLocale,
  targetLocale,
  subject,
  message,
}: {
  sourceLocale: Locale;
  targetLocale: Locale;
  subject: string;
  message: string;
}) {
  if (targetLocale === sourceLocale) return { subject, message };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI translation is not configured.");
  }

  const model = process.env.OPENAI_TRANSLATION_MODEL || "gpt-5-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "Translate concise community update emails. Preserve URLs, island codes, brand names, game titles, line breaks, and placeholders. Return only strict JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            sourceLanguage: LOCALE_LABELS[sourceLocale],
            targetLanguage: LOCALE_LABELS[targetLocale],
            subject,
            message,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "translated_email",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              subject: { type: "string" },
              message: { type: "string" },
            },
            required: ["subject", "message"],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Translation failed.");
  }

  const result = (await response.json()) as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ text?: string }>;
    }>;
  };
  const json =
    result.output_text ||
    result.output?.flatMap((item) => item.content ?? []).find((content) => content.text)
      ?.text;

  if (!json) throw new Error("Translation response was empty.");

  const translated = JSON.parse(json) as { subject?: unknown; message?: unknown };
  return {
    subject: cleanText(translated.subject, 140) || subject,
    message: cleanMultilineText(translated.message, 2000) || message,
  };
}

async function ensureUnsubscribeToken({
  request,
  lead,
  supabaseUrl,
  serviceRoleKey,
}: {
  request: NextRequest;
  lead: LeadEmailRow;
  supabaseUrl: string;
  serviceRoleKey: string;
}) {
  const token = createToken();
  const update = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?id=eq.${encodeURIComponent(lead.id)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(serviceRoleKey, "return=minimal"),
      body: JSON.stringify({
        marketing_unsubscribe_token_hash: hashToken(token),
      }),
    }
  );

  if (!update.ok) {
    throw new Error(`Could not prepare unsubscribe link for ${lead.email}.`);
  }

  return getUnsubscribeUrl(request, token);
}

export async function GET(request: NextRequest) {
  const ip = getIp(request);
  if (
    isRateLimited(
      `admin:${ip}`,
      ADMIN_RATE_LIMIT_MAX_REQUESTS,
      ADMIN_RATE_LIMIT_WINDOW_MS
    )
  ) {
    return NextResponse.json({ error: "Too many admin requests." }, { status: 429 });
  }

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
    "signup_locale",
    "preferred_email_locale",
    "marketing_unsubscribed",
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
  const ip = getIp(request);
  if (
    isRateLimited(
      `admin:${ip}`,
      ADMIN_RATE_LIMIT_MAX_REQUESTS,
      ADMIN_RATE_LIMIT_WINDOW_MS
    )
  ) {
    return NextResponse.json({ error: "Too many admin requests." }, { status: 429 });
  }

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
  const preferredEmailLocale = cleanLocale(body.preferredEmailLocale);

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
        preferred_email_locale: preferredEmailLocale,
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
  const ip = getIp(request);
  if (
    isRateLimited(
      `admin:${ip}`,
      ADMIN_RATE_LIMIT_MAX_REQUESTS,
      ADMIN_RATE_LIMIT_WINDOW_MS
    )
  ) {
    return NextResponse.json({ error: "Too many admin requests." }, { status: 429 });
  }

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
  const message = cleanMultilineText(body.message, 2000);
  const isBroadcast = body.broadcast === true;
  const sourceLocale = cleanLocale(body.sourceLocale) || defaultLocale;
  const forceEnglish = body.forceEnglish === true;
  const confirmBroadcast = cleanText(body.confirmBroadcast, 20);

  if (!id && !isBroadcast) {
    return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
  }

  if (subject.length < 3) {
    return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  }

  if (message.length < 5) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (isBroadcast) {
    if (confirmBroadcast !== "SEND") {
      return NextResponse.json(
        { error: "Type SEND to confirm this broadcast." },
        { status: 400 }
      );
    }

    if (
      isRateLimited(
        `broadcast:${ip}`,
        BROADCAST_RATE_LIMIT_MAX_REQUESTS,
        BROADCAST_RATE_LIMIT_WINDOW_MS
      )
    ) {
      return NextResponse.json(
        { error: "Broadcast rate limit reached. Please wait before sending another." },
        { status: 429 }
      );
    }

    const select = [
      "id",
      "name",
      "email",
      "email_confirmed",
      "signup_locale",
      "preferred_email_locale",
      "marketing_unsubscribed",
      "marketing_unsubscribe_token_hash",
    ].join(",");

    const lookup = await fetch(
      `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?select=${select}&email_confirmed=eq.true&contact_consent=eq.true&marketing_unsubscribed=eq.false&order=created_at.desc&limit=500`,
      {
        headers: getSupabaseHeaders(config.serviceRoleKey),
        cache: "no-store",
      }
    );

    if (!lookup.ok) {
      return NextResponse.json({ error: "Could not load broadcast recipients." }, { status: 502 });
    }

    const recipients = (await lookup.json()) as LeadEmailRow[];
    if (recipients.length === 0) {
      return NextResponse.json({ error: "No confirmed, consented recipients found." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.WELCOME_EMAIL_FROM;
    const replyTo = process.env.WELCOME_EMAIL_REPLY_TO || "nldevsmtl@gmail.com";
    const translations = new Map<Locale, { subject: string; message: string }>();
    let sent = 0;
    const failed: string[] = [];

    translations.set(sourceLocale, { subject, message });

    for (const recipient of recipients) {
      const targetLocale = forceEnglish ? defaultLocale : getLeadLocale(recipient);
      let localized = translations.get(targetLocale);

      if (!localized) {
        localized = await translateEmail({
          sourceLocale,
          targetLocale,
          subject,
          message,
        });
        translations.set(targetLocale, localized);
      }

      try {
        const unsubscribeUrl = await ensureUnsubscribeToken({
          request,
          lead: recipient,
          supabaseUrl: config.supabaseUrl,
          serviceRoleKey: config.serviceRoleKey,
        });

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [recipient.email],
            subject: localized.subject,
            text: buildBroadcastText({
              name: recipient.name,
              message: localized.message,
              unsubscribeUrl,
            }),
            html: buildBroadcastHtml({
              name: recipient.name,
              message: localized.message,
              unsubscribeUrl,
            }),
            reply_to: replyTo,
            headers: {
              "List-Unsubscribe": `<${unsubscribeUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });

        if (!emailResponse.ok) throw new Error(await emailResponse.text());
        sent += 1;
      } catch {
        failed.push(recipient.email);
      }
    }

    return NextResponse.json({
      ok: true,
      sent,
      failed,
      translatedLocales: Array.from(translations.keys()),
    });
  }

  const lookup = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?select=id,name,email,email_confirmed,signup_locale,preferred_email_locale,marketing_unsubscribed,marketing_unsubscribe_token_hash&id=eq.${encodeURIComponent(id)}&limit=1`,
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
