import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import {
  findBlockedLanguageFields,
  hasBlockedLanguage,
} from "@/utils/contentModeration";

type PlayerLeadInput = {
  action?: unknown;
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
  memberGoals?: unknown;
  contactConsent?: unknown;
  ageAttestation?: unknown;
  website?: unknown;
};

type LeadRow = {
  id: string;
  name: string;
  email: string;
  fortnite_name: string | null;
  discord_name: string | null;
  avatar_style: string | null;
  favorite_map: string | null;
  message: string | null;
  image_name: string | null;
  image_type: string | null;
  image_url: string | null;
  image_purpose: string | null;
  developer_interest: boolean | null;
  developer_role: string | null;
  developer_portfolio: string | null;
  developer_skills: string | null;
  developer_availability: string | null;
  member_goals: string | null;
  contact_consent: boolean | null;
  age_attestation: boolean | null;
  email_confirmed: boolean | null;
  email_confirmed_at: string | null;
  email_confirmation_token_hash: string | null;
  email_confirmation_sent_at: string | null;
  created_at: string;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IMAGE_DATA_PATTERN = /^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/;
const MAX_IMAGE_DATA_LENGTH = 2_100_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const PLACEHOLDER_KEYS = new Set([
  "your-service-role-key",
  "your-secret-key",
  "your_secret_key_here",
  "your-resend-api-key",
]);

const rateLimitStore = globalThis as typeof globalThis & {
  __nldevsRateLimit?: Map<string, RateEntry>;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function getSupabaseRestUrl(value: string) {
  return value.replace(/\/+$/, "").replace(/\/rest\/v1$/, "") + "/rest/v1";
}

function getSupabaseOrigin(value: string) {
  return value.replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
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

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const store = rateLimitStore.__nldevsRateLimit ?? new Map<string, RateEntry>();
  rateLimitStore.__nldevsRateLimit = store;

  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
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

function getConfirmEmailUrl(request: NextRequest, token: string) {
  const url = new URL("/api/player-leads/confirm", getRequestOrigin(request));
  url.searchParams.set("token", token);
  return url.toString();
}

function toClientProfile(row: LeadRow) {
  return {
    name: row.name,
    email: row.email,
    fortniteName: row.fortnite_name ?? undefined,
    discordName: row.discord_name ?? undefined,
    avatarStyle: row.avatar_style ?? undefined,
    favoriteMap: row.favorite_map ?? undefined,
    message: row.message ?? undefined,
    imageName: row.image_name ?? undefined,
    imageType: row.image_type ?? undefined,
    imageUrl: row.image_url ?? undefined,
    imagePurpose: row.image_purpose ?? undefined,
    developerInterest: row.developer_interest ?? false,
    developerRole: row.developer_role ?? undefined,
    developerPortfolio: row.developer_portfolio ?? undefined,
    developerSkills: row.developer_skills ?? undefined,
    developerAvailability: row.developer_availability ?? undefined,
    memberGoals: row.member_goals ?? undefined,
    contactConsent: row.contact_consent ?? false,
    ageAttestation: row.age_attestation ?? false,
    emailConfirmed: row.email_confirmed ?? false,
    emailConfirmedAt: row.email_confirmed_at ?? undefined,
    savedAt: row.created_at,
  };
}

async function findMemberByEmail({
  supabaseUrl,
  serviceRoleKey,
  email,
}: {
  supabaseUrl: string;
  serviceRoleKey: string;
  email: string;
}) {
  const select = [
    "id",
    "name",
    "email",
    "fortnite_name",
    "discord_name",
    "avatar_style",
    "favorite_map",
    "message",
    "image_name",
    "image_type",
    "image_url",
    "image_purpose",
    "developer_interest",
    "developer_role",
    "developer_portfolio",
    "developer_skills",
    "developer_availability",
    "member_goals",
    "contact_consent",
    "age_attestation",
    "email_confirmed",
    "email_confirmed_at",
    "email_confirmation_token_hash",
    "email_confirmation_sent_at",
    "created_at",
  ].join(",");

  const response = await fetch(
    `${getSupabaseRestUrl(supabaseUrl)}/player_leads?select=${select}&email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=1`,
    {
      headers: getSupabaseHeaders(serviceRoleKey),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = (await response.json()) as LeadRow[];
  return rows[0] ?? null;
}

async function uploadImage({
  supabaseUrl,
  serviceRoleKey,
  imageData,
  imageType,
  imageName,
}: {
  supabaseUrl: string;
  serviceRoleKey: string;
  imageData: string;
  imageType: string;
  imageName: string;
}) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;
  if (!bucket || !imageData) return null;

  const match = imageData.match(IMAGE_DATA_PATTERN);
  if (!match) return null;

  const extension = match[1].split("/")[1].replace("jpeg", "jpg");
  const safeName = imageName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${Date.now()}-${crypto.randomUUID()}-${safeName || `upload.${extension}`}`;
  const bytes = Buffer.from(match[2], "base64");

  const response = await fetch(
    `${getSupabaseOrigin(supabaseUrl)}/storage/v1/object/${bucket}/${path}`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": imageType || match[1],
        "x-upsert": "false",
      },
      body: bytes,
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return `${bucket}/${path}`;
}

async function sendWelcomeEmail({
  name,
  email,
  contactConsent,
  confirmEmailUrl,
}: {
  name: string;
  email: string;
  contactConsent: boolean;
  confirmEmailUrl: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;
  const replyTo = process.env.WELCOME_EMAIL_REPLY_TO;

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return { skipped: true };
  }

  const firstName = escapeHtml(getFirstName(name));
  const updatesLine = contactConsent
    ? "We will keep you posted on new drops, playtests, and updates."
    : "You can reply to this email anytime if you want to reach NLDEVS.";
  const safeConfirmUrl = escapeHtml(confirmEmailUrl);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Confirm your NLDEVS email",
      text: `Hi ${getFirstName(name)},\n\nThanks for joining NLDEVS. Please confirm your email:\n${confirmEmailUrl}\n\n${updatesLine}\n\n- NLDEVS`,
      html: `
        <p>Hi ${firstName},</p>
        <p>Thanks for joining NLDEVS. Please confirm your email to verify your member access.</p>
        <p><a href="${safeConfirmUrl}" style="display:inline-block;background:#22d3ee;color:#030014;font-weight:700;padding:12px 18px;text-decoration:none;">Confirm email</a></p>
        <p>${escapeHtml(updatesLine)}</p>
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

async function sendOwnerNewMemberEmail({
  profile,
  sourcePath,
}: {
  profile: {
    name: string;
    email: string;
    fortniteName: string;
    discordName: string;
    favoriteMap: string;
    developerInterest: boolean;
    developerRole: string;
    developerPortfolio: string;
    memberGoals: string;
    contactConsent: boolean;
  };
  sourcePath: string | null;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_EMAIL_FROM;
  const notifyEmail =
    process.env.NEW_MEMBER_NOTIFY_EMAIL ||
    process.env.WELCOME_EMAIL_REPLY_TO ||
    "nldevsmtl@gmail.com";

  if (!resendApiKey || !from || PLACEHOLDER_KEYS.has(resendApiKey)) {
    return { skipped: true };
  }

  const rows = [
    ["Name", profile.name],
    ["Email", profile.email],
    ["Fortnite", profile.fortniteName || "-"],
    ["Discord", profile.discordName || "-"],
    ["Favorite map", profile.favoriteMap || "-"],
    ["Developer interest", profile.developerInterest ? "Yes" : "No"],
    ["Developer role", profile.developerRole || "-"],
    ["Portfolio", profile.developerPortfolio || "-"],
    ["Here for", profile.memberGoals || "-"],
    ["Contact consent", profile.contactConsent ? "Yes" : "No"],
    ["Source", sourcePath || "-"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2>New NLDEVS member</h2>
    <table>
      <tbody>
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyEmail],
      subject: `New NLDEVS member: ${profile.name}`,
      text,
      html,
      reply_to: profile.email,
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

  const action = cleanText(body.action, 20) || "signup";
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 180).toLowerCase();
  const honeypot = cleanText(body.website, 200);
  const ip = getIp(request);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(`${ip}:${email || "anonymous"}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes." },
      { status: 429 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (hasBlockedLanguage([email])) {
    return NextResponse.json(
      { error: "Please keep member info respectful and appropriate." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey || PLACEHOLDER_KEYS.has(serviceRoleKey)) {
    return NextResponse.json(
      { error: "Member database is not configured." },
      { status: 503 }
    );
  }

  let existingMember: LeadRow | null;

  try {
    existingMember = await findMemberByEmail({ supabaseUrl, serviceRoleKey, email });
  } catch (error) {
    console.error("Supabase member lookup failed", error);
    return NextResponse.json(
      { error: "Could not reach member database." },
      { status: 502 }
    );
  }

  if (action === "login") {
    if (!existingMember) {
      return NextResponse.json(
        { error: "No member found. Join below.", code: "MEMBER_NOT_FOUND" },
        { status: 404 }
      );
    }

    if (!existingMember.email_confirmed) {
      return NextResponse.json(
        {
          error: "Please confirm your email before logging in. Check your inbox.",
          code: "EMAIL_NOT_CONFIRMED",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      mode: "login",
      profile: toClientProfile(existingMember),
    });
  }

  if (action === "signup" && existingMember) {
    return NextResponse.json(
      {
        error: existingMember.email_confirmed
          ? "That email is already a member. Use Returning Member."
          : "That email is already pending confirmation. Check your inbox.",
        code: existingMember.email_confirmed
          ? "MEMBER_ALREADY_EXISTS"
          : "EMAIL_NOT_CONFIRMED",
      },
      { status: 409 }
    );
  }

  if (action === "update" && !existingMember) {
    return NextResponse.json(
      { error: "No member found. Join below.", code: "MEMBER_NOT_FOUND" },
      { status: 404 }
    );
  }

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
  const memberGoals = cleanText(body.memberGoals, 240);
  const contactConsent = body.contactConsent === true;
  const ageAttestation = body.ageAttestation === true;
  const imageData = typeof body.imageData === "string" ? body.imageData : "";
  const needsEmailConfirmation = !existingMember?.email_confirmed;
  const confirmationToken = needsEmailConfirmation ? createConfirmationToken() : "";
  const confirmationSentAt = needsEmailConfirmation ? new Date().toISOString() : null;

  const blockedFields = findBlockedLanguageFields({
    name,
    email,
    fortniteName,
    discordName,
    avatarStyle,
    favoriteMap,
    message,
    imageName,
    imagePurpose,
    developerRole,
    developerPortfolio,
    developerSkills,
    developerAvailability,
    memberGoals,
  });

  if (blockedFields.length > 0) {
    return NextResponse.json(
      { error: "Please keep member info respectful and appropriate." },
      { status: 400 }
    );
  }

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!ageAttestation) {
    return NextResponse.json(
      {
        error:
          "Please confirm you are 13 or older and have parent/guardian permission if under 18.",
      },
      { status: 400 }
    );
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

  let imageUrl: string | null = null;

  try {
    imageUrl = await uploadImage({
      supabaseUrl,
      serviceRoleKey,
      imageData,
      imageType,
      imageName,
    });
  } catch (error) {
    console.error("Supabase image upload failed", error);
    return NextResponse.json(
      { error: "Image upload failed. Try a smaller image or submit without it." },
      { status: 502 }
    );
  }

  const payload = {
    name,
    email,
    fortnite_name: fortniteName || null,
    discord_name: discordName || null,
    avatar_style: avatarStyle || null,
    favorite_map: favoriteMap || null,
    message: message || null,
    image_name: imageData ? imageName || null : existingMember?.image_name ?? null,
    image_type: imageData ? imageType || null : existingMember?.image_type ?? null,
    image_data: null,
    image_url: imageData ? imageUrl : existingMember?.image_url ?? null,
    image_purpose: imageData ? imagePurpose || null : existingMember?.image_purpose ?? null,
    developer_interest: developerInterest,
    developer_role: developerRole || null,
    developer_portfolio: developerPortfolio || null,
    developer_skills: developerSkills || null,
    developer_availability: developerAvailability || null,
    member_goals: memberGoals || null,
    contact_consent: contactConsent,
    age_attestation: ageAttestation,
    ...(needsEmailConfirmation
      ? {
          email_confirmed: false,
          email_confirmation_token_hash: hashConfirmationToken(confirmationToken),
          email_confirmation_sent_at: confirmationSentAt,
        }
      : {}),
    source_path: request.headers.get("referer") ?? null,
    user_agent: request.headers.get("user-agent") ?? null,
  };

  let response: Response;

  try {
    if (existingMember) {
      response = await fetch(
        `${getSupabaseRestUrl(supabaseUrl)}/player_leads?id=eq.${existingMember.id}`,
        {
          method: "PATCH",
          headers: getSupabaseHeaders(serviceRoleKey, "return=representation"),
          body: JSON.stringify(payload),
        }
      );
    } else {
      response = await fetch(`${getSupabaseRestUrl(supabaseUrl)}/player_leads`, {
        method: "POST",
        headers: getSupabaseHeaders(serviceRoleKey, "return=representation"),
        body: JSON.stringify(payload),
      });
    }
  } catch (error) {
    console.error("Supabase player lead request failed", error);
    return NextResponse.json(
      { error: "Could not reach member database." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    console.error("Supabase player lead save failed", {
      status: response.status,
      body: await response.text(),
    });

    return NextResponse.json(
      { error: "Could not save member profile." },
      { status: 502 }
    );
  }

  const rows = (await response.json()) as LeadRow[];
  const savedMember = rows[0];

  if (needsEmailConfirmation) {
    try {
      await sendWelcomeEmail({
        name,
        email,
        contactConsent,
        confirmEmailUrl: getConfirmEmailUrl(request, confirmationToken),
      });
    } catch (error) {
      console.error("Confirmation email failed", error);
    }
  }

  if (!existingMember) {
    try {
      await sendOwnerNewMemberEmail({
        profile: {
          name,
          email,
          fortniteName,
          discordName,
          favoriteMap,
          developerInterest,
          developerRole,
          developerPortfolio,
          memberGoals,
          contactConsent,
        },
        sourcePath: request.headers.get("referer"),
      });
    } catch (error) {
      console.error("New member notification failed", error);
    }
  }

  return NextResponse.json({
    ok: true,
    mode: existingMember ? "updated" : "signup",
    profile: savedMember ? toClientProfile(savedMember) : undefined,
  });
}
