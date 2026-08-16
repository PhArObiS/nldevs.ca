import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/star-wars-fortnite-maps" as const;

/** Related-hub order must match `hubs.starWars.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/tmnt-fortnite-maps",
  "/squid-game-fortnite-maps",
  "/fortnite-gun-game-maps",
  "/best-fortnite-xp-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { image: "/StarWarsRvB.jpg" });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="starWars"
      href={HREF}
      mapIds={HUB_MAP_IDS.starWars}
      relatedHrefs={RELATED}
    />
  );
}
