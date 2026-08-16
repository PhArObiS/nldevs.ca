import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "sidekick-siege-99-bots" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.sidekick-siege-99-bots.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/squid-game-fortnite-maps",
  "/99-bots-squid-royale-boss",
  "/rvb-squid-minigame",
];

/**
 * Schema fields unique to this map. Locale-independent: alternate names are
 * the other English strings players actually search for.
 */
const SCHEMA_EXTRAS = {
  "alternateName": [
    "Sidekick Siege",
    "99 Bots Sidekick Siege",
    "Sidekick Siege Fortnite"
  ],
  "numberOfPlayers": "1-5",
  "playMode": "MultiPlayer",
  "applicationCategory": "Game"
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/sidekick-siege-99-bots", locale, {
    code: MAP.code,
    image: MAP.image,
  });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapDetailPage
      mapId={MAP_ID}
      parentHref="/squid-game-fortnite-maps"
      similarHrefs={SIMILAR}
      schemaExtras={SCHEMA_EXTRAS}
    />
  );
}
