import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "99-bots-squid-royale-boss" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.99-bots-squid-royale-boss.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/squid-game-fortnite-maps",
  "/sidekick-siege-99-bots",
  "/rvb-squid-minigame",
];

/**
 * Schema fields unique to this map. Locale-independent: alternate names are
 * the other English strings players actually search for.
 */
const SCHEMA_EXTRAS = {
  "alternateName": [
    "99 Bots Squid Royale",
    "Squid Royale Boss",
    "99 Bots Boss"
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
  return pageMetadata("/99-bots-squid-royale-boss", locale, {
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
