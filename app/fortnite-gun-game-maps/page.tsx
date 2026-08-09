import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/fortnite-gun-game-maps";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
  description:
    "Browse the best Fortnite Gun Game maps and map codes curated by NLDEVS. Fast-paced weapon progression, PvP arenas, and replayable rounds.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDEVS — weapon progression PvP maps built for replayability.",
    images: [{ url: `${SITE_URL}/WinterfestDemonHuntersGunGame.jpeg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDEVS — weapon progression PvP maps built for replayability.",
    images: [`${SITE_URL}/WinterfestDemonHuntersGunGame.jpeg`],
  },
};

const gunGameMaps = [
  {
    title: "TMNT City — Gun Game",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpg",
    mode: "Gun Game",
    notes:
      "TMNT-themed combat loops with fast weapon progression and replayable rounds.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "Winterfest Demon Hunters — Gun Game",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "FFA Gun Game",
    notes:
      "Holiday demon-hunting gun game with repeatable combat loops and weapon rotations.",
    detailsHref: "/winterfest-demon-hunters",
  },
];

export default function FortniteGunGameMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite Gun Game Maps",
    url: `${SITE_URL}${PAGE_PATH}`,
  };

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="gungame-schema" data={pageSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Gun Game Maps" }]}
        eyebrow="Weapon progression"
        title="Best Fortnite"
        accent="Gun Game maps"
        description="Fast-paced weapon progression modes where eliminations upgrade your loadout. Curated islands with codes and quick notes."
        lastUpdated={LAST_UPDATED}
      />

      <ContentSection title="What is a Fortnite" accent="Gun Game map?">
        <div className="space-y-4 text-center leading-relaxed md:text-left text-gray-400">
          <p>
            Fortnite Gun Game is a weapon progression PvP mode built for quick,
            replayable rounds. Players start with a weapon and upgrade after each
            elimination.
          </p>
          <p>
            The goal is to finish the weapon list before everyone else. Great Gun
            Game maps have strong flow, balanced weapon rotations, and fast
            respawns.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="Gun Game map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          stagger={0.07}
        >
          {gunGameMaps.map((m, i) => (
            <RevealItem key={m.code} className="h-full">
              <FortniteMapsCard
                src={m.image}
                title={m.title}
                code={m.code}
                mode={m.mode}
                notes={m.notes}
                href={m.detailsHref}
                priority={i < 2}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection title="Tips to win" accent="Gun Game rounds">
        <CenteredList>
          <li>Learn spawn flow and rotate fights.</li>
          <li>Hold angles and re-peek smart.</li>
          <li>Mid-range accuracy beats flashy plays.</li>
          <li>Keep moving to upgrade weapons faster.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/best-fortnite-xp-maps", label: "XP Maps" },
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
