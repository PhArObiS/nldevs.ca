import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "kpop-demon-hunters" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.kpop-demon-hunters.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/fortnite-gun-game-maps",
  "/best-fortnite-xp-maps",
  "/tmnt-fortnite-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/kpop-demon-hunters", locale, {
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
      parentHref="/fortnite-gun-game-maps"
      similarHrefs={SIMILAR}
    />
  );
}
