import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/squid-game-fortnite-maps" as const;

/** Related-hub order must match `hubs.squidGame.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/best-fortnite-xp-maps",
  "/fortnite-gun-game-maps",
  "/tmnt-fortnite-maps",
  "/star-wars-fortnite-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { image: "/RedVsBlueSquidMinigame.jpg" });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="squidGame"
      href={HREF}
      mapIds={HUB_MAP_IDS.squidGame}
      relatedHrefs={RELATED}
    />
  );
}
