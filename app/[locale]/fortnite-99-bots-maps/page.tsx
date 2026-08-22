import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import MapHubPage from "@/components/pages/MapHubPage";
import { pageMetadata } from "@/i18n/pageMetadata";
import { HUB_MAP_IDS } from "@/constants/maps";
import type { AppPathname, Locale } from "@/i18n/routing";

const HREF = "/fortnite-99-bots-maps" as const;

/** Related-hub order must match `hubs.bots99.relatedLabels` in the catalog. */
const RELATED: AppPathname[] = [
  "/squid-game-fortnite-maps",
  "/star-wars-fortnite-maps",
  "/best-fortnite-xp-maps",
  "/fortnite-red-vs-blue-maps",
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata(HREF, locale, {
    image: "/99 Bots Squid Royale Boss.jpg",
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
      hubId="bots99"
      href={HREF}
      mapIds={HUB_MAP_IDS.bots99}
      relatedHrefs={RELATED}
    />
  );
}
