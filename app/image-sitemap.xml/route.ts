import { SITE_LOGO_URL, SITE_URL } from "@/constants/site";

const ENTRIES = [
  {
    page: "/",
    images: [{ loc: SITE_LOGO_URL, title: "NLDEVS logo" }],
  },
  {
    page: "/tmnt-fortnite-maps",
    images: [
      {
        loc: `${SITE_URL}/MegaRampSurvival.jpeg`,
        title: "TMNT Mega Ramp Survival Fortnite map",
      },
      {
        loc: `${SITE_URL}/CityTMNT.jpeg`,
        title: "TMNT City Fortnite map",
      },
    ],
  },
  {
    page: "/squid-game-fortnite-maps",
    images: [
      {
        loc: `${SITE_URL}/RedVsBlueSquidMinigame.jpg`,
        title: "RvB Squid Minigame Fortnite map",
      },
      {
        loc: `${SITE_URL}/TiltedSquidRoyale99Bots.jpeg`,
        title: "Tilted Squid Royale 99 Bots Fortnite map",
      },
    ],
  },
  {
    page: "/fortnite-gun-game-maps",
    images: [
      {
        loc: `${SITE_URL}/WinterfestDemonHuntersGunGame.jpeg`,
        title: "Winterfest Demon Hunters Fortnite gun game map",
      },
      {
        loc: `${SITE_URL}/CityTMNT.jpeg`,
        title: "TMNT City Fortnite gun game map",
      },
    ],
  },
  {
    page: "/best-fortnite-xp-maps",
    images: [
      {
        loc: `${SITE_URL}/MegaRampSurvival.jpeg`,
        title: "TMNT Mega Ramp Survival Fortnite XP map",
      },
      {
        loc: `${SITE_URL}/RedVsBluePlayersVsGuards.jpeg`,
        title: "RvB Players vs Guards Fortnite XP map",
      },
    ],
  },
  {
    page: "/tmnt-mega-ramp-survival",
    images: [
      {
        loc: `${SITE_URL}/MegaRampSurvival.jpeg`,
        title: "TMNT Mega Ramp Survival Fortnite island code",
      },
    ],
  },
  {
    page: "/tmnt-city",
    images: [
      {
        loc: `${SITE_URL}/CityTMNT.jpeg`,
        title: "TMNT City Fortnite island code",
      },
    ],
  },
  {
    page: "/rvb-squid-minigame",
    images: [
      {
        loc: `${SITE_URL}/RedVsBlueSquidMinigame.jpg`,
        title: "RvB Squid Minigame Fortnite island code",
      },
    ],
  },
  {
    page: "/tilted-squid-royale-99-bots",
    images: [
      {
        loc: `${SITE_URL}/TiltedSquidRoyale99Bots.jpeg`,
        title: "Tilted Squid Royale 99 Bots Fortnite island code",
      },
    ],
  },
  {
    page: "/winterfest-demon-hunters",
    images: [
      {
        loc: `${SITE_URL}/WinterfestDemonHuntersGunGame.jpeg`,
        title: "Winterfest Demon Hunters Fortnite island code",
      },
    ],
  },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const urls = ENTRIES.map(
    (entry) => `<url>
  <loc>${escapeXml(`${SITE_URL}${entry.page}`)}</loc>
${entry.images
  .map(
    (image) => `  <image:image>
    <image:loc>${escapeXml(image.loc)}</image:loc>
    <image:title>${escapeXml(image.title)}</image:title>
  </image:image>`
  )
  .join("\n")}
</url>`
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    }
  );
}
