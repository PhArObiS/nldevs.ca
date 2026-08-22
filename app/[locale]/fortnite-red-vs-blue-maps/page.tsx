import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/fortnite-red-vs-blue-maps" as const;

/** Related-hub order must match `hubs.redVsBlue.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/squid-game-fortnite-maps",
  "/star-wars-fortnite-maps",
  "/fortnite-99-bots-maps",
  "/best-fortnite-xp-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, {
    image: "/RedVsBlueSquidMinigame.jpg",
  });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="redVsBlue"
      href={HREF}
      mapIds={HUB_MAP_IDS.redVsBlue}
      relatedHrefs={RELATED}
    />
  );
}
