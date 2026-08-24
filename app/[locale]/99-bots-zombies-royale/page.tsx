import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "99-bots-zombies-royale" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.99-bots-zombies-royale.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/99-bots-squid-royale-boss",
  "/sidekick-siege-99-bots",
  "/star-wars-tilted-99-bots-royale",
];

/**
 * Schema fields unique to this map. Locale-independent: alternate names are
 * the other English strings players actually search for.
 */
const SCHEMA_EXTRAS = {
  alternateName: [
    "Zombies Royale",
    "99 Bots Zombies Royale",
    "Fortnite Zombies Royale",
    "Zombies Royale Fortnite",
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
  return pageMetadata("/99-bots-zombies-royale", locale, {
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
      parentHref="/fortnite-99-bots-maps"
      similarHrefs={SIMILAR}
      schemaExtras={SCHEMA_EXTRAS}
    />
  );
}
