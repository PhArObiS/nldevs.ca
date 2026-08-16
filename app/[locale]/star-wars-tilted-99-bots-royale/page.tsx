import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "star-wars-tilted-99-bots-royale" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.star-wars-tilted-99-bots-royale.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/star-wars-fortnite-maps",
  "/star-wars-mega-rvb",
  "/star-wars-tycoon-sidekick-legends",
];

/**
 * Schema fields unique to this map. Locale-independent: alternate names are
 * the other English strings players actually search for.
 */
const SCHEMA_EXTRAS = {
  "alternateName": [
    "Star Wars 99 Bots Royale",
    "Star Wars Tilted Royale",
    "Tilted 99 Bots Royale"
  ],
  "numberOfPlayers": "1-5",
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/star-wars-tilted-99-bots-royale", locale, {
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
      parentHref="/star-wars-fortnite-maps"
      similarHrefs={SIMILAR}
      schemaExtras={SCHEMA_EXTRAS}
    />
  );
}
