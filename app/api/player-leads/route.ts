import { NextRequest, NextResponse } from "next/server";

type PlayerLeadInput = {
  name?: unknown;
  email?: unknown;
  fortniteName?: unknown;
  discordName?: unknown;
  avatarStyle?: unknown;
  favoriteMap?: unknown;
  message?: unknown;
  imageName?: unknown;
  imageType?: unknown;
  imageData?: unknown;
  imagePurpose?: unknown;
  developerInterest?: unknown;
  developerRole?: unknown;
  developerPortfolio?: unknown;
  developerSkills?: unknown;
  developerAvailability?: unknown;
  contactConsent?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IMAGE_DATA_PATTERN = /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/;
const MAX_IMAGE_DATA_LENGTH = 2_100_000;
const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
  "your-resend-api-key",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function getSupabaseRestUrl(value: string) {
  return value.replace(/\/+$/, "").replace(/\/rest\/v1$/, "") + "/rest/v1";
}

function getSupabaseHeaders(key: string) {
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return headers;
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

async function sendWelcomeEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;
  const replyTo = process.env.WELCOME_EMAIL_REPLY_TO;

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return { skipped: true };
  }

  const firstName = escapeHtml(getFirstName(name));
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Welcome to NLDEVS",
      text: `Hi ${getFirstName(name)},\n\nThanks for joining NLDEVS. We appreciate you checking out our Fortnite maps and will keep you posted on new drops, playtests, and updates.\n\n- NLDEVS`,
      html: `
        <p>Hi ${firstName},</p>
        <p>Thanks for joining NLDEVS. We appreciate you checking out our Fortnite maps and will keep you posted on new drops, playtests, and updates.</p>
        <p>- NLDEVS</p>
      `,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { skipped: false };
}

export async function POST(request: NextRequest) {
  let body: PlayerLeadInput;

  try {
    body = (await request.json()) as PlayerLeadInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 180).toLowerCase();
  const fortniteName = cleanText(body.fortniteName, 80);
  const discordName = cleanText(body.discordName, 80);
  const avatarStyle = cleanText(body.avatarStyle, 80);
  const favoriteMap = cleanText(body.favoriteMap, 160);
  const message = cleanText(body.message, 600);
  const imageName = cleanText(body.imageName, 180);
  const imageType = cleanText(body.imageType, 40);
  const imagePurpose = cleanText(body.imagePurpose, 80);
  const developerInterest = body.developerInterest === true;
  const developerRole = cleanText(body.developerRole, 120);
  const developerPortfolio = cleanText(body.developerPortfolio, 240);
  const developerSkills = cleanText(body.developerSkills, 500);
  const developerAvailability = cleanText(body.developerAvailability, 120);
  const contactConsent = body.contactConsent === true;
  const imageData = typeof body.imageData === "string" ? body.imageData : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (imageData) {
    const match = imageData.match(IMAGE_DATA_PATTERN);

    if (!match) {
      return NextResponse.json({ error: "Image must be PNG, JPG, WebP, or GIF." }, { status: 400 });
    }

    if (imageData.length > MAX_IMAGE_DATA_LENGTH) {
      return NextResponse.json({ error: "Image must be 1.5 MB or smaller." }, { status: 400 });
    }

    if (imageType && imageType !== match[1]) {
      return NextResponse.json({ error: "Image type does not match upload." }, { status: 400 });
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return NextResponse.json(
      { error: "Player lead database is not configured." },
      { status: 503 }
    );
  }

  let response: Response;

  try {
    response = await fetch(`${getSupabaseRestUrl(supabaseUrl)}/player_leads`, {
      method: "POST",
      headers: getSupabaseHeaders(serviceRoleKey),
      body: JSON.stringify({
        name,
        email,
        fortnite_name: fortniteName || null,
        discord_name: discordName || null,
        avatar_style: avatarStyle || null,
        favorite_map: favoriteMap || null,
        message: message || null,
        image_name: imageData ? imageName || null : null,
        image_type: imageData ? imageType || null : null,
        image_data: imageData || null,
        image_purpose: imageData ? imagePurpose || null : null,
        developer_interest: developerInterest,
        developer_role: developerRole || null,
        developer_portfolio: developerPortfolio || null,
        developer_skills: developerSkills || null,
        developer_availability: developerAvailability || null,
        contact_consent: contactConsent,
        source_path: request.headers.get("referer") ?? null,
        user_agent: request.headers.get("user-agent") ?? null,
      }),
    });
  } catch (error) {
    console.error("Supabase player lead request failed", error);
    return NextResponse.json(
      { error: "Could not reach player lead database." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    console.error("Supabase player lead insert failed", {
      status: response.status,
      body: await response.text(),
    });

    return NextResponse.json(
      { error: "Could not save player lead." },
      { status: 502 }
    );
  }

  try {
    await sendWelcomeEmail({ name, email });
  } catch (error) {
    console.error("Welcome email failed", error);
  }

  return NextResponse.json({ ok: true });
}
