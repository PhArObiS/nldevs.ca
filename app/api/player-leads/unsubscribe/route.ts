import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
]);

function getSupabaseRestUrl(value: string) {
  return value.replace(/\/+$/, "").replace(/\/rest\/v1$/, "") + "/rest/v1";
}

function getSupabaseHeaders(key: string, prefer = "return=minimal") {
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

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function page(title: string, message: string) {
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
      </body>
    </html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

async function unsubscribe(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")?.trim() ?? "";

  if (!token) {
    return { ok: false, status: 400, message: "The unsubscribe link is missing its token." };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return { ok: false, status: 503, message: "Unsubscribe is not configured." };
  }

  const response = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?marketing_unsubscribe_token_hash=eq.${encodeURIComponent(hashToken(token))}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(serviceRoleKey, "return=representation"),
      body: JSON.stringify({
        marketing_unsubscribed: true,
        marketing_unsubscribed_at: new Date().toISOString(),
        marketing_unsubscribe_token_hash: null,
      }),
    }
  );

  if (!response.ok) {
    return { ok: false, status: 502, message: "We could not update your email preference." };
  }

  const rows = (await response.json()) as unknown[];
  if (rows.length === 0) {
    return { ok: false, status: 404, message: "This unsubscribe link is invalid or has already been used." };
  }

  return { ok: true, status: 200, message: "You have been unsubscribed from NLDEVS launch and event emails." };
}

export async function GET(request: NextRequest) {
  const result = await unsubscribe(request);

  if (!result.ok) {
    return page("Unsubscribe unavailable", result.message);
  }

  return page("Unsubscribed", result.message);
}

export async function POST(request: NextRequest) {
  const result = await unsubscribe(request);
  return NextResponse.json(
    { ok: result.ok, message: result.message },
    { status: result.status }
  );
}
