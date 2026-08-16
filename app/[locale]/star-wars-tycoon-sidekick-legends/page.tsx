import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "star-wars-tycoon-sidekick-legends" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.star-wars-tycoon-sidekick-legends.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/star-wars-fortnite-maps",
  "/star-wars-mega-rvb",
  "/star-wars-tilted-99-bots-royale",
];

/**
 * Schema fields unique to this map. Locale-independent: alternate names are
 * the other English strings players actually search for.
 */
const SCHEMA_EXTRAS = {
  "alternateName": [
    "Star Wars Tycoon Sidekick Legends",
    "Star Wars Tycoon Map",
    "Sidekick Legends",
    "Star Wars Tycoon"
  ],
  "numberOfPlayers": "1-4",
  "playMode": "MultiPlayer",
  "applicationCategory": "Game"
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/star-wars-tycoon-sidekick-legends", locale, {
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
