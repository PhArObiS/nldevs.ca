import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/best-fortnite-xp-maps" as const;

/** Related-hub order must match `hubs.xp.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/fortnite-gun-game-maps",
  "/tmnt-fortnite-maps",
  "/squid-game-fortnite-maps",
  "/star-wars-fortnite-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, { image: "/MegaRampSurvival.jpeg" });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <MapHubPage
      hubId="xp"
      href={HREF}
      mapIds={HUB_MAP_IDS.xp}
      relatedHrefs={RELATED}
    />
  );
}
