import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getApiTranslations, resolveApiLocale } from "@/i18n/apiLocale";
import { LOCALE_META, type Locale } from "@/i18n/routing";
import { SOCIAL_LINKS } from "@/constants/site";

type ConfirmationRow = {
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

function hashConfirmationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
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

async function sendAccountConfirmedEmail({
  name,
  email,
  locale,
}: {
  name: string;
  email: string;
  /** Language carried from the confirmation link. */
  locale: Locale;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;
  const replyTo = process.env.WELCOME_EMAIL_REPLY_TO;

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return { skipped: true };
  }

  const t = await getApiTranslations(locale);
  const greeting = t("emailGreeting", { name: getFirstName(name) });
  const safeFortniteUrl = escapeHtml(SOCIAL_LINKS.fortnite);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: t("confirmedSubject"),
      text: `${greeting}\n\n${t("confirmedBody")}\n\n${t("confirmedFollowLine")}\n${SOCIAL_LINKS.fortnite}\n\n${t("emailSignoff")}`,
      html: `
        <p>${escapeHtml(greeting)}</p>
        <p>${escapeHtml(t("confirmedBody"))}</p>
        <p><a href="${safeFortniteUrl}" style="display:inline-block;background:#22d3ee;color:#030014;font-weight:700;padding:12px 18px;text-decoration:none;">${escapeHtml(t("emailFollowButton"))}</a></p>
        <p>${escapeHtml(t("emailSignoff"))}</p>
      `,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { skipped: false };
}

function confirmationPage({
  title,
  message,
  discordLabel,
  locale,
  confirmedEmail,
  confirmedAt,
}: {
  title: string;
  message: string;
  discordLabel: string;
  locale: Locale;
  confirmedEmail?: string;
  confirmedAt?: string;
}) {
  const safeDiscordUrl = escapeHtml(SOCIAL_LINKS.discord);
  const profileUpdateScript =
    confirmedEmail && confirmedAt
      ? `<script>
          try {
            var key = "nldevs-client-profile";
            var raw = window.localStorage.getItem(key);
            var profile = raw ? JSON.parse(raw) : null;
            if (profile && String(profile.email || "").toLowerCase() === ${JSON.stringify(
              confirmedEmail.toLowerCase()
            )}) {
              profile.emailConfirmed = true;
              profile.emailConfirmedAt = ${JSON.stringify(confirmedAt)};
              window.localStorage.setItem(key, JSON.stringify(profile));
            }
          } catch (_) {}
        </script>`
      : "";

  return new NextResponse(
    `<!doctype html>
    <html lang="${LOCALE_META[locale].htmlLang}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #030014;
            color: #ffffff;
            font-family: Arial, sans-serif;
          }
          main {
            width: min(90vw, 560px);
            border: 1px solid rgba(34, 211, 238, 0.5);
            background: rgba(9, 6, 28, 0.92);
            padding: 32px;
          }
          p { color: #b8bed3; line-height: 1.6; }
          a {
            display: inline-block;
            margin-top: 16px;
            background: #22d3ee;
            color: #030014;
            font-weight: 800;
            padding: 12px 18px;
            text-decoration: none;
          }
          .discord {
            margin-left: 8px;
            background: #5865f2;
            color: #ffffff;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <a href="/">Back to NLDEVS</a>
          ${
            confirmedEmail
              ? `<a class="discord" href="${safeDiscordUrl}">${escapeHtml(discordLabel)}</a>`
              : ""
          }
        </main>
        ${profileUpdateScript}
      </body>
    </html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")?.trim() ?? "";

  // The link is clicked from an inbox, so there is no NEXT_LOCALE cookie —
  // the language rides along in ?lang, set when the email was sent.
  const locale = resolveApiLocale(
    request,
    request.nextUrl.searchParams.get("lang")
  );
  const t = await getApiTranslations(locale);
  const page = (opts: {
    title: string;
    message: string;
    confirmedEmail?: string;
    confirmedAt?: string;
  }) =>
    confirmationPage({
      ...opts,
      locale,
      discordLabel: t("pageJoinDiscord"),
    });

  if (!token) {
    return page({
      title: t("pageInvalidTitle"),
      message: t("pageMissingToken"),
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return page({
      title: t("pageUnavailableTitle"),
      message: t("pageDbNotConfigured"),
    });
  }

  const tokenHash = hashConfirmationToken(token);
  const lookup = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?select=id,name,email,email_confirmed&email_confirmation_token_hash=eq.${encodeURIComponent(tokenHash)}&limit=1`,
    {
      headers: getSupabaseHeaders(serviceRoleKey),
      cache: "no-store",
    }
  );

  if (!lookup.ok) {
    return page({
      title: t("pageUnavailableTitle"),
      message: t("pageCheckFailed"),
    });
  }

  const rows = (await lookup.json()) as ConfirmationRow[];
  const member = rows[0];

  if (!member) {
    return page({
      title: t("pageInvalidTitle"),
      message: t("pageLinkReplaced"),
    });
  }

  if (member.email_confirmed) {
    return page({
      title: t("pageAlreadyTitle"),
      message: t("pageAlreadyMessage"),
    });
  }

  const now = new Date().toISOString();
  const update = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?id=eq.${encodeURIComponent(member.id)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(serviceRoleKey),
      body: JSON.stringify({
        email_confirmed: true,
        email_confirmed_at: now,
        email_confirmation_token_hash: null,
      }),
    }
  );

  if (!update.ok) {
    return page({
      title: t("pageUnavailableTitle"),
      message: t("pageConfirmFailed"),
    });
  }

  try {
    await sendAccountConfirmedEmail({
      name: member.name,
      email: member.email,
      locale,
    });
  } catch (error) {
    console.error("Account confirmed email failed", error);
  }

  return page({
    title: t("pageConfirmedTitle"),
    message: t("pageConfirmedMessage"),
    confirmedEmail: member.email,
    confirmedAt: now,
  });
}
