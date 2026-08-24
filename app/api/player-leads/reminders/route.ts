import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getApiTranslations } from "@/i18n/apiLocale";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { SOCIAL_LINKS } from "@/constants/site";

type ReminderLeadRow = {
  id: string;
  name: string;
  email: string;
  signup_locale: string | null;
  email_confirmation_sent_at: string | null;
  email_confirmation_reminder_sent_at: string | null;
  email_confirmation_reminder_count: number | null;
};

const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
  "your-resend-api-key",
]);
const localeSet = new Set<string>(locales);
const FIRST_REMINDER_AFTER_MS = 24 * 60 * 60 * 1000;
const FINAL_REMINDER_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_REMINDERS = 2;
const MAX_REMINDERS_PER_RUN = 50;

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
  const reminderToken = process.env.CRON_SECRET || process.env.ADMIN_ACCESS_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;

  if (!reminderToken || reminderToken.length < 32) {
    return { error: "Reminder access token is not configured." };
  }

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return { error: "Member database is not configured." };
  }

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return { error: "Email sending is not configured." };
  }

  return { reminderToken, supabaseUrl, serviceRoleKey, resendApiKey, from };
}

function isAuthorized(request: NextRequest, token: string) {
  const authorization = request.headers.get("authorization") ?? "";
  const submitted = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : request.nextUrl.searchParams.get("token") ?? "";

  const submittedBytes = Buffer.from(submitted);
  const expectedBytes = Buffer.from(token);

  if (submittedBytes.length !== expectedBytes.length) return false;
  return timingSafeEqual(submittedBytes, expectedBytes);
}

function cleanLocale(value: string | null) {
  return value && localeSet.has(value) ? (value as Locale) : defaultLocale;
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

function createConfirmationToken() {
  return randomBytes(32).toString("base64url");
}

function hashConfirmationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getRequestOrigin(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  if (host) return `${protocol}://${host}`;
  return "https://nldevs.ca";
}

function getConfirmEmailUrl(request: NextRequest, token: string, locale: Locale) {
  const url = new URL("/api/player-leads/confirm", getRequestOrigin(request));
  url.searchParams.set("token", token);
  url.searchParams.set("lang", locale);
  return url.toString();
}

function shouldSendReminder(lead: ReminderLeadRow, now: number) {
  const count = lead.email_confirmation_reminder_count ?? 0;
  if (count >= MAX_REMINDERS) return false;

  const lastSent = Date.parse(
    lead.email_confirmation_reminder_sent_at ||
      lead.email_confirmation_sent_at ||
      ""
  );
  if (!Number.isFinite(lastSent)) return false;

  const waitMs = count === 0 ? FIRST_REMINDER_AFTER_MS : FINAL_REMINDER_AFTER_MS;
  return now - lastSent >= waitMs;
}

async function sendReminderEmail({
  request,
  lead,
  locale,
  confirmEmailUrl,
  resendApiKey,
  from,
}: {
  request: NextRequest;
  lead: ReminderLeadRow;
  locale: Locale;
  confirmEmailUrl: string;
  resendApiKey: string;
  from: string;
}) {
  const t = await getApiTranslations(locale);
  const greeting = t("emailGreeting", { name: getFirstName(lead.name) });
  const safeConfirmUrl = escapeHtml(confirmEmailUrl);
  const safeFortniteUrl = escapeHtml(SOCIAL_LINKS.fortnite);
  const replyTo = process.env.WELCOME_EMAIL_REPLY_TO || "nldevsmtl@gmail.com";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [lead.email],
      subject: t("confirmationReminderSubject"),
      text: `${greeting}\n\n${t("confirmationReminderText")}\n${confirmEmailUrl}\n\n${t("confirmationReminderIgnore")}\n\n${t("emailFollowLine")}\n${SOCIAL_LINKS.fortnite}\n\n${t("emailSignoff")}`,
      html: `
        <p>${escapeHtml(greeting)}</p>
        <p>${escapeHtml(t("confirmationReminderHtml"))}</p>
        <p><a href="${safeConfirmUrl}" style="display:inline-block;background:#22d3ee;color:#030014;font-weight:700;padding:12px 18px;text-decoration:none;">${escapeHtml(t("emailConfirmButton"))}</a></p>
        <p>${escapeHtml(t("confirmationReminderIgnore"))}</p>
        <p>${escapeHtml(t("emailFollowLine"))}</p>
        <p><a href="${safeFortniteUrl}" style="display:inline-block;border:1px solid #22d3ee;color:#030014;background:#22d3ee;font-weight:700;padding:12px 18px;text-decoration:none;">${escapeHtml(t("emailFollowButton"))}</a></p>
        <p>${escapeHtml(t("emailSignoff"))}</p>
      `,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { ok: true };
}

export async function GET(request: NextRequest) {
  const config = getConfig();
  if ("error" in config) {
    return NextResponse.json({ error: config.error }, { status: 503 });
  }

  if (!isAuthorized(request, config.reminderToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const select = [
    "id",
    "name",
    "email",
    "signup_locale",
    "email_confirmation_sent_at",
    "email_confirmation_reminder_sent_at",
    "email_confirmation_reminder_count",
  ].join(",");

  const lookup = await fetch(
    `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?select=${select}&email_confirmed=eq.false&email_confirmation_reminder_count=lt.${MAX_REMINDERS}&order=email_confirmation_sent_at.asc&limit=${MAX_REMINDERS_PER_RUN}`,
    {
      headers: getSupabaseHeaders(config.serviceRoleKey),
      cache: "no-store",
    }
  );

  if (!lookup.ok) {
    return NextResponse.json(
      { error: "Could not load pending confirmations." },
      { status: 502 }
    );
  }

  const nowMs = Date.now();
  const leads = ((await lookup.json()) as ReminderLeadRow[]).filter((lead) =>
    shouldSendReminder(lead, nowMs)
  );
  let sent = 0;
  const failed: string[] = [];

  for (const lead of leads) {
    const locale = cleanLocale(lead.signup_locale);
    const confirmationToken = createConfirmationToken();
    const now = new Date().toISOString();
    const nextCount = (lead.email_confirmation_reminder_count ?? 0) + 1;

    const updateToken = await fetch(
      `${getSupabaseRestUrl(config.supabaseUrl)}/player_leads?id=eq.${encodeURIComponent(lead.id)}`,
      {
        method: "PATCH",
        headers: getSupabaseHeaders(config.serviceRoleKey, "return=minimal"),
        body: JSON.stringify({
          email_confirmation_token_hash: hashConfirmationToken(confirmationToken),
          email_confirmation_sent_at: now,
          email_confirmation_reminder_sent_at: now,
          email_confirmation_reminder_count: nextCount,
        }),
      }
    );

    if (!updateToken.ok) {
      failed.push(lead.email);
      continue;
    }

    try {
      await sendReminderEmail({
        request,
        lead,
        locale,
        confirmEmailUrl: getConfirmEmailUrl(request, confirmationToken, locale),
        resendApiKey: config.resendApiKey,
        from: config.from,
      });
      sent += 1;
    } catch {
      failed.push(lead.email);
    }
  }

  return NextResponse.json({
    ok: true,
    checked: leads.length,
    sent,
    failed,
  });
}

export const POST = GET;
