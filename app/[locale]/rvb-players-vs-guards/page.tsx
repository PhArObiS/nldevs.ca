import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "rvb-players-vs-guards" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.rvb-players-vs-guards.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/fortnite-red-vs-blue-maps",
  "/best-fortnite-xp-maps",
  "/rvb-squid-minigame",
];

const SCHEMA_EXTRAS = {
  alternateName: [
    "Red vs Blue Players vs Guards",
    "RvB Guards",
    "Players vs Guards Fortnite",
  ],
  numberOfPlayers: "Party friendly",
  playMode: "MultiPlayer",
  applicationCategory: "Game",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/rvb-players-vs-guards", locale, {
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
      parentHref="/fortnite-red-vs-blue-maps"
      similarHrefs={SIMILAR}
      schemaExtras={SCHEMA_EXTRAS}
    />
  );
}
