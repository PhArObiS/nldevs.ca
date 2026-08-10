import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

type ConfirmationRow = {
  id: string;
  email: string;
  email_confirmed: boolean | null;
};

const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
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

function confirmationPage({
  title,
  message,
  confirmedEmail,
  confirmedAt,
}: {
  title: string;
  message: string;
  confirmedEmail?: string;
  confirmedAt?: string;
}) {
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
    <html lang="en">
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
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <a href="/">Back to NLDEVS</a>
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

  if (!token) {
    return confirmationPage({
      title: "Invalid confirmation link",
      message: "This confirmation link is missing a token. Please try signing up again.",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return confirmationPage({
      title: "Confirmation unavailable",
      message: "The member database is not configured right now. Please try again later.",
    });
  }

  const tokenHash = hashConfirmationToken(token);
  const lookup = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?select=id,email,email_confirmed&email_confirmation_token_hash=eq.${encodeURIComponent(tokenHash)}&limit=1`,
    {
      headers: getSupabaseHeaders(serviceRoleKey),
      cache: "no-store",
    }
  );

  if (!lookup.ok) {
    return confirmationPage({
      title: "Confirmation unavailable",
      message: "We could not check this confirmation link. Please try again later.",
    });
  }

  const rows = (await lookup.json()) as ConfirmationRow[];
  const member = rows[0];

  if (!member) {
    return confirmationPage({
      title: "Invalid confirmation link",
      message: "This confirmation link is invalid or has already been replaced.",
    });
  }

  if (member.email_confirmed) {
    return confirmationPage({
      title: "Email already confirmed",
      message: "Your NLDEVS member email is already verified.",
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
    return confirmationPage({
      title: "Confirmation unavailable",
      message: "We could not confirm your email right now. Please try again later.",
    });
  }

  return confirmationPage({
    title: "Email confirmed",
    message: "You are verified for NLDEVS member access. Thanks for joining.",
    confirmedEmail: member.email,
    confirmedAt: now,
  });
}
