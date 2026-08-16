import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapDetailPage from "@/components/pages/MapDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const MAP_ID = "tmnt-city" as const;
const MAP = MAPS[MAP_ID];

/** Order must match `mapPages.tmnt-city.similarLabels` in the catalog. */
const SIMILAR: AppPathname[] = [
  "/tmnt-mega-ramp-survival",
  "/fortnite-gun-game-maps",
  "/tmnt-fortnite-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/tmnt-city", locale, {
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
      parentHref="/tmnt-fortnite-maps"
      similarHrefs={SIMILAR}
    />
  );
}
