import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import {
  locales,
  type AppPathname,
  type Locale,
} from "@/i18n/routing";
import { MAPS, type MapId } from "@/constants/maps";
import { SITE_LOGO_URL, SITE_URL } from "@/constants/site";

/**
 * Image sitemap, emitted for every locale.
 *
 * Previously this listed only the English page URLs with English image
 * titles, so the fr/pt/es pages had no image coverage at all. Image `loc`
 * values now come from the map registry rather than being repeated here, so
 * an image swap in constants/maps.ts cannot leave this file stale.
 */

/** Title phrasing, keyed into the `imageSitemap` namespace. */
type TitleKind = "map" | "islandCode" | "gunGame" | "xp";

type Entry = {
  page: AppPathname;
  images: { mapId: MapId; kind: TitleKind }[];
};

const ENTRIES: Entry[] = [
  {
    page: "/star-wars-fortnite-maps",
    images: [
      { mapId: "star-wars-mega-rvb", kind: "map" },
      { mapId: "star-wars-tycoon-sidekick-legends", kind: "map" },
      { mapId: "star-wars-tilted-99-bots-royale", kind: "map" },
    ],
  },
  {
    page: "/tmnt-fortnite-maps",
    images: [
      { mapId: "tmnt-mega-ramp-survival", kind: "map" },
      { mapId: "tmnt-city", kind: "map" },
    ],
  },
  {
    page: "/squid-game-fortnite-maps",
    images: [
      { mapId: "rvb-squid-minigame", kind: "map" },
      { mapId: "99-bots-squid-royale-boss", kind: "map" },
      { mapId: "sidekick-siege-99-bots", kind: "map" },
    ],
  },
  {
    page: "/fortnite-gun-game-maps",
    images: [
      { mapId: "winterfest-demon-hunters", kind: "gunGame" },
      { mapId: "tmnt-city", kind: "gunGame" },
    ],
  },
  {
    page: "/best-fortnite-xp-maps",
    images: [
      { mapId: "tmnt-mega-ramp-survival", kind: "xp" },
      { mapId: "rvb-players-vs-guards", kind: "xp" },
    ],
  },
  {
    page: "/star-wars-tycoon-sidekick-legends",
    images: [{ mapId: "star-wars-tycoon-sidekick-legends", kind: "islandCode" }],
  },
  {
    page: "/star-wars-mega-rvb",
    images: [{ mapId: "star-wars-mega-rvb", kind: "islandCode" }],
  },
  {
    page: "/star-wars-tilted-99-bots-royale",
    images: [{ mapId: "star-wars-tilted-99-bots-royale", kind: "islandCode" }],
  },
  {
    page: "/tmnt-mega-ramp-survival",
    images: [{ mapId: "tmnt-mega-ramp-survival", kind: "islandCode" }],
  },
  {
    page: "/tmnt-city",
    images: [{ mapId: "tmnt-city", kind: "islandCode" }],
  },
  {
    page: "/rvb-squid-minigame",
    images: [{ mapId: "rvb-squid-minigame", kind: "islandCode" }],
  },
  {
    page: "/99-bots-squid-royale-boss",
    images: [{ mapId: "99-bots-squid-royale-boss", kind: "islandCode" }],
  },
  {
    page: "/sidekick-siege-99-bots",
    images: [{ mapId: "sidekick-siege-99-bots", kind: "islandCode" }],
  },
  {
    page: "/winterfest-demon-hunters",
    images: [{ mapId: "winterfest-demon-hunters", kind: "islandCode" }],
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

function absolute(href: AppPathname, locale: Locale) {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

/** Image URLs are absolute and locale-independent — one file per asset. */
function imageUrl(path: string) {
  return `${SITE_URL}${encodeURI(path)}`;
}

export const dynamic = "force-static";

export async function GET() {
  const blocks: string[] = [];

  for (const locale of locales) {
    const t = await getTranslations({ locale, namespace: "imageSitemap" });

    // Homepage / logo
    blocks.push(
      [
        "<url>",
        `  <loc>${escapeXml(absolute("/", locale))}</loc>`,
        "  <image:image>",
        `    <image:loc>${escapeXml(SITE_LOGO_URL)}</image:loc>`,
        `    <image:title>${escapeXml(t("logo"))}</image:title>`,
        "  </image:image>",
        "</url>",
      ].join("\n")
    );

    for (const entry of ENTRIES) {
      const images = entry.images
        .map(({ mapId, kind }) => {
          const map = MAPS[mapId];
          return [
            "  <image:image>",
            `    <image:loc>${escapeXml(imageUrl(map.image))}</image:loc>`,
            `    <image:title>${escapeXml(
              t(kind, { title: map.title })
            )}</image:title>`,
            "  </image:image>",
          ].join("\n");
        })
        .join("\n");

      blocks.push(
        [
          "<url>",
          `  <loc>${escapeXml(absolute(entry.page, locale))}</loc>`,
          images,
          "</url>",
        ].join("\n")
      );
    }
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blocks.join("\n")}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    }
  );
}
