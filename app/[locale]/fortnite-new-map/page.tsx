import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/fortnite-new-map" as const;

/**
 * Whichever island shipped most recently. Changing this one constant, the
 * `mapPages.new-fortnite-map` copy, and the image-sitemap entry is the whole
 * handover when a newer map takes over — Sidekick Legends next.
 */
const NEWEST = "sidekick-siege-99-bots" as const;
const MAP = MAPS[NEWEST];

/**
 * Reads its copy from `mapPages.new-fortnite-map`, not from the island's own
 * namespace. Rendering the map's usual copy here would make this page
 * byte-identical to /sidekick-siege-99-bots, and Google drops one of a
 * duplicate pair — almost always the newer, less-linked one, which is this.
 */
const CONTENT_KEY = "new-fortnite-map";

/** Order must match `mapPages.new-fortnite-map.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/fortnite-99-bots-maps",
  "/squid-game-fortnite-maps",
  "/best-fortnite-xp-maps",
];

const SCHEMA_EXTRAS = {
  alternateName: [
    "New Fortnite Map",
    "Newest Fortnite Map",
    "Latest Fortnite Map",
    "New Fortnite Map Code",
  ],
  numberOfPlayers: "1-5",
  playMode: "MultiPlayer",
  applicationCategory: "Game",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { code: MAP.code, image: MAP.image });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapDetailPage
      mapId={NEWEST}
      contentKey={CONTENT_KEY}
      parentHref="/fortnite-99-bots-maps"
      similarHrefs={SIMILAR}
      fullDetailHref="/sidekick-siege-99-bots"
      schemaExtras={SCHEMA_EXTRAS}
    />
  );
}
