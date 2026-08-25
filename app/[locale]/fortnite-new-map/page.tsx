import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS, MAPS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/fortnite-new-map" as const;
const FEATURED_MAP = MAPS["sidekick-siege-99-bots"];

/** Related-hub order must match `hubs.newMap.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/fortnite-99-bots-maps",
  "/squid-game-fortnite-maps",
  "/fortnite-gun-game-maps",
  "/best-fortnite-xp-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { image: FEATURED_MAP.image });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="newMap"
      href={HREF}
      mapIds={HUB_MAP_IDS.newMap}
      relatedHrefs={RELATED}
    />
  );
}
