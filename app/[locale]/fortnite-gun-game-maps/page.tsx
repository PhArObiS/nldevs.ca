import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/fortnite-gun-game-maps" as const;

/** Related-hub order must match `hubs.gunGame.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/best-fortnite-xp-maps",
  "/tmnt-fortnite-maps",
  "/squid-game-fortnite-maps",
  "/star-wars-fortnite-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { image: "/WinterfestDemonHuntersGunGame.jpeg" });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="gunGame"
      href={HREF}
      mapIds={HUB_MAP_IDS.gunGame}
      relatedHrefs={RELATED}
    />
  );
}
