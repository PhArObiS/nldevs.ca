import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "rvb-squid-minigame" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.rvb-squid-minigame.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/squid-game-fortnite-maps",
  "/best-fortnite-xp-maps",
  "/fortnite-gun-game-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/rvb-squid-minigame", locale, {
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
    />
  );
}
