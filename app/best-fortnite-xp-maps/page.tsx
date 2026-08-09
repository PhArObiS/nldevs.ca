import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import { BackToTop, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/best-fortnite-xp-maps";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDEVS",
  description:
    "Best Fortnite XP maps and map codes to help you level up efficiently. Curated by NLDEVS with quick summaries and updated picks.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDEVS",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDEVS.",
  },
};

const xpMaps = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Active",
    notes:
      "Fast-paced survival runs with repeatable gameplay loops. Great if you prefer active play while leveling.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    type: "Mixed",
    notes:
      "Combat-focused loops with repeatable rounds. Works well for players who want XP while fighting.",
    detailsHref: "/winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    type: "Mixed",
    notes:
      "Team-based objectives and longer sessions. Good for steady XP while playing PvP-style rounds.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Active",
    notes: "Exploration and combat routes with consistent XP loops.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "Active",
    notes: "Fast rounds and objective-based play.",
    detailsHref: "/rvb-squid-minigame",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Mixed",
    notes: "Battle royale vs bots with repeatable matches.",
    detailsHref: "/tilted-squid-royale-99-bots",
  },
];

export default function BestFortniteXpMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite XP Maps",
    url: `${SITE_URL}${PAGE_PATH}`,
  };

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="xp-schema" data={pageSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "XP Maps" }]}
        eyebrow="Level up faster"
        title="Best Fortnite"
        accent="XP maps"
        description="Curated Fortnite XP maps with island codes and quick notes on how each one plays."
        lastUpdated={LAST_UPDATED}
      />

      <ContentSection title="XP map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {xpMaps.map((m, i) => (
            <RevealItem key={m.code} className="h-full">
              <FortniteMapsCard
                src={m.image}
                title={m.title}
                code={m.code}
                mode={m.type}
                notes={m.notes}
                href={m.detailsHref}
                priority={i < 3}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/star-wars-fortnite-maps", label: "Star Wars Maps" },
          ]}
        />
      </ContentSection>

      <BackToTop />
    </main>
  );
}
