import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/star-wars-fortnite-maps";
const LAST_UPDATED = "August 2026";

export const metadata: Metadata = {
  title: "Star Wars Fortnite Maps & Island Codes | NLDEVS",
  description:
    "Browse Star Wars Fortnite maps and island codes by NLDEVS, including Star Wars Tycoon Sidekick Legends, Star Wars Mega RvB, and Star Wars Tilted 99 Bots Royale.",
  keywords: [
    "Star Wars Fortnite maps",
    "Star Wars Fortnite map codes",
    "Star Wars island codes",
    "Star Wars Tycoon Sidekick Legends",
    "Star Wars Mega RvB",
    "Star Wars Tilted 99 Bots Royale",
    "Star Wars Tycoon",
    "Fortnite Star Wars tycoon",
    "Star Wars Tycoon map code",
    "UEFN Star Wars maps",
  ],
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Star Wars Fortnite Maps & Island Codes | NLDEVS",
    description:
      "Star Wars Fortnite maps and island codes by NLDEVS — tycoon, Red vs Blue, and bot royale experiences.",
    images: [{ url: `${SITE_URL}/StarWarsRvB.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Wars Fortnite Maps & Island Codes | NLDEVS",
    description:
      "Star Wars Fortnite maps and island codes by NLDEVS — tycoon, Red vs Blue, and bot royale experiences.",
    images: [`${SITE_URL}/StarWarsRvB.jpg`],
  },
};

const starWarsMaps: {
  title: string;
  code: string;
  image: string;
  type: string;
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "Star Wars Tycoon Sidekick Legends",
    code: "3205-2388-4588",
    image: "/TycoonSidekicks.jpg",
    type: "Coming Soon / Tycoon",
    notes:
      "Coming soon: Star Wars Tycoon with Sidekick and Hero unlocks, new sections and upgrades, workers that boost production, rebirth leaderboard climbing, auto-saving progress, and up to 4 players.",
    detailsHref: "/star-wars-tycoon-sidekick-legends",
  },
  {
    title: "Star Wars Mega RvB",
    code: "7323-8876-4862",
    image: "/StarWarsRvB.jpg",
    type: "Team Deathmatch",
    notes:
      "Red vs Blue PvP with Star Wars weapons, custom weapons, vehicles, achievements, music, and ranking up to Unreal.",
    detailsHref: "/star-wars-mega-rvb",
  },
  {
    title: "Star Wars Tilted 99 Bots Royale",
    code: "1116-7765-9076",
    image: "/StarWarsTilted99BotsRoyale.jpg",
    type: "Bot Royale",
    notes:
      "Open-world PvE survival with 99 bots, boss battles, unlockable heroes, saved stats and loadouts, and Star Wars-themed Tilted action.",
    detailsHref: "/star-wars-tilted-99-bots-royale",
  },
];

const faqs = [
  {
    q: "What are the best Star Wars Fortnite maps by NLDEVS?",
    a: "NLDEVS currently features Star Wars Tycoon Sidekick Legends, Star Wars Mega RvB, and Star Wars Tilted 99 Bots Royale.",
  },
  {
    q: "What is the Star Wars Tycoon Sidekick Legends island code?",
    a: "Star Wars Tycoon Sidekick Legends is coming soon. The announced island code is 3205-2388-4588.",
  },
  {
    q: "Which Star Wars Fortnite map is best for PvP?",
    a: "Star Wars Mega RvB is the best fit for PvP because it is a Red vs Blue team deathmatch map with Star Wars weapons, custom weapons, vehicles, achievements, and ranking.",
  },
  {
    q: "Which Star Wars Fortnite map has bots?",
    a: "Star Wars Tilted 99 Bots Royale is the bot-focused Star Wars map, with 99-bot royale survival, boss battles, unlockable heroes, saved stats, and saved loadouts.",
  },
];

export default function StarWarsFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Star Wars Fortnite Maps & Island Codes",
    description:
      "A curated list of Star Wars Fortnite maps and island codes built with UEFN by NLDEVS.",
    url: `${SITE_URL}${PAGE_PATH}`,
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
    about: [
      "Star Wars Fortnite maps",
      "Star Wars island codes",
      "Fortnite tycoon maps",
      "Fortnite Red vs Blue maps",
      "Fortnite 99 bots royale maps",
      "UEFN Star Wars islands",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "Star Wars Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: starWarsMaps.length,
      itemListElement: starWarsMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `Star Wars Fortnite Map (${m.type})`,
          description: `Fortnite island code: ${m.code}. ${m.notes}`,
          url: m.detailsHref
            ? `${SITE_URL}${m.detailsHref}`
            : `${SITE_URL}${PAGE_PATH}#${m.code.replaceAll("-", "")}`,
          image: `${SITE_URL}${m.image}`,
          publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="starwars-collection-schema" data={pageSchema} />
      <JsonLd id="starwars-faq-schema" data={faqSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Star Wars Maps" }]}
        eyebrow="A galaxy far, far away"
        title="Star Wars"
        accent="Fortnite maps"
        description="Star Wars Fortnite experiences built with Unreal Editor for Fortnite. Explore tycoon progression, Red vs Blue PvP, bot royale survival, and island codes."
        lastUpdated={LAST_UPDATED}
      />

      <ContentSection title="Star Wars map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {starWarsMaps.map((m, i) => (
            <RevealItem key={m.title} className="h-full">
              <div id={m.code.replaceAll("-", "")} className="h-full">
                <FortniteMapsCard
                  src={m.image}
                  title={m.title}
                  code={m.code}
                  mode={m.type}
                  notes={m.notes}
                  href={m.detailsHref}
                  priority={i < 3}
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the island code exactly (####-####-####).</li>
          <li>Join the island and follow the in-game objectives.</li>
          <li>Favorite the map to find it faster next time.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="What you'll" accent="find">
        <CenteredList>
          <li>Star Wars Tycoon progression with saves, rebirths, and rewards.</li>
          <li>Red vs Blue team deathmatch with Star Wars weapons and vehicles.</li>
          <li>99-bot royale survival with heroes, bosses, and saved loadouts.</li>
          <li>UEFN-built experiences designed for repeat sessions with friends.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <ContentSection title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/best-fortnite-xp-maps", label: "XP Maps" },
          ]}
        />
      </ContentSection>

      <p className="mt-16 text-center text-sm text-gray-500">
        Community-created Fortnite experiences built with UEFN. Not affiliated
        with Lucasfilm, Disney, or Epic Games.
      </p>

      <BackToTop />
    </main>
  );
}
