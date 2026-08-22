import { getPathname } from "@/i18n/navigation";
import {
  ALL_PATHNAMES,
  LOCALE_META,
  defaultLocale,
  locales,
  type AppPathname,
  type Locale,
} from "@/i18n/routing";
import { SITE_URL } from "@/constants/site";

/**
 * Hand-rolled rather than Next's `sitemap.ts` helper.
 *
 * The helper's `alternates.languages` field is ignored on Next 14.1 — it
 * silently emits no `xhtml:link` elements — so the hreflang annotations
 * never reached the sitemap. Emitting the XML directly keeps the annotations
 * regardless of Next version.
 *
 * Routes come from the i18n pathname map, so a page cannot be added to the
 * app and forgotten here.
 */

const HUB_ROUTES: AppPathname[] = [
  "/star-wars-fortnite-maps",
  "/tmnt-fortnite-maps",
  "/squid-game-fortnite-maps",
  "/fortnite-gun-game-maps",
  "/best-fortnite-xp-maps",
  "/fortnite-99-bots-maps",
  "/fortnite-red-vs-blue-maps",
  "/playtest-squad",
  "/uefn-contracts",
  "/privacy",
];

/** Matches i18n/metadata.ts — the root keeps its trailing slash so the
 *  sitemap and the emitted canonical agree exactly. */
function absolute(href: AppPathname, locale: Locale) {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

function priorityFor(href: AppPathname) {
  if (href === "/") return "1.0";
  return HUB_ROUTES.includes(href) ? "0.9" : "0.7";
}

function changeFreqFor(href: AppPathname) {
  return href === "/" || HUB_ROUTES.includes(href) ? "weekly" : "monthly";
}

/** XML-escapes a URL for safe inclusion in an attribute or text node. */
function xml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();

  const entries = ALL_PATHNAMES.flatMap((href) => {
    // Every locale version lists every other, including itself, plus
    // x-default — Google discards non-reciprocal hreflang sets.
    const alternates = [
      ...locales.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${xml(absolute(href, l))}"/>`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(absolute(href, defaultLocale))}"/>`,
    ].join("\n");

    return locales.map((locale) =>
      [
        "  <url>",
        `    <loc>${xml(absolute(href, locale))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changeFreqFor(href)}</changefreq>`,
        `    <priority>${priorityFor(href)}</priority>`,
        alternates,
        "  </url>",
      ].join("\n")
    );
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
