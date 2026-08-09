import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import MapGallery from "@/components/ui/MapGallery";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Star Wars Tycoon Sidekick Legends",
  code: "3205-2388-4588",
  image: "/TycoonSidekicks.jpg",
  url: `${SITE_URL}/star-wars-tycoon-sidekick-legends`,
};

export const metadata: Metadata = {
  title: `Star Wars Tycoon Sidekick Legends Coming Soon (${MAP.code}) | Fortnite Tycoon`,
  description:
    "Star Wars Tycoon Sidekick Legends is coming soon to Fortnite. Map code 3205-2388-4588. Unlock Sidekicks and Heroes, build new sections, hire workers, climb the Rebirth leaderboard, and save progress automatically.",
  keywords: [
    "Star Wars Tycoon Sidekick Legends",
    "Star Wars Tycoon",
    "Star Wars Tycoon Fortnite",
    "Star Wars Tycoon map code",
    "Star Wars Fortnite tycoon map",
    "Fortnite tycoon map code",
    "Sidekick Legends Fortnite",
    "NLDEVS Star Wars map",
    "UEFN tycoon map",
  ],
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Star Wars Tycoon Sidekick Legends Coming Soon | NLDEVS`,
    description:
      "Star Wars Tycoon Sidekick Legends by NLDEVS is coming soon - unlock Sidekicks, Heroes, sections, upgrades, workers, Rebirth rewards, and automatic saved progress.",
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Star Wars Tycoon Sidekick Legends Coming Soon | NLDEVS`,
    description:
      "Star Wars Tycoon Sidekick Legends by NLDEVS is coming soon - build your Star Wars Tycoon, unlock Heroes and Sidekicks, hire workers, rebirth, and save progress.",
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "What is the Star Wars Tycoon Sidekick Legends island code?",
    a: `Star Wars Tycoon Sidekick Legends is coming soon. The announced island code is ${MAP.code}.`,
  },
  {
    q: "Does Star Wars Tycoon Sidekick Legends save progress?",
    a: "Yes. All progress saves automatically so players can return to their tycoon progression.",
  },
  {
    q: "How many players can join?",
    a: "Star Wars Tycoon Sidekick Legends supports up to 4 players.",
  },
];

export default function StarWarsTycoonSidekickLegendsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    alternateName: [
      "Star Wars Tycoon Sidekick Legends",
      "Star Wars Tycoon Map",
      "Sidekick Legends",
      "Star Wars Tycoon",
    ],
    gamePlatform: "Fortnite",
    genre: "Star Wars Tycoon",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    numberOfPlayers: "1-4",
    playMode: "MultiPlayer",
    applicationCategory: "Game",
    keywords:
      "Star Wars Tycoon, Star Wars Tycoon Sidekick Legends, Fortnite tycoon, Star Wars Fortnite map, UEFN tycoon, island code, tycoon map code",
    description:
      "Star Wars Tycoon Sidekick Legends is a coming soon Star Wars Tycoon Fortnite map by NLDEVS with Sidekick and Hero unlocks, new sections, workers, production boosts, Rebirth leaderboard progression, automatic saves, and up to 4 players.",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Island code status", value: "Coming soon" },
      { "@type": "PropertyValue", name: "Island code", value: MAP.code },
      { "@type": "PropertyValue", name: "Max players", value: "4" },
      { "@type": "PropertyValue", name: "Savings", value: "All progress saves automatically" },
      { "@type": "PropertyValue", name: "Core mode", value: "Star Wars Tycoon progression" },
    ],
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
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
    <main id="top" className="mx-auto w-full max-w-5xl px-6 py-14">
      <JsonLd id="star-wars-tycoon-sidekick-legends-schema" data={schema} />
      <JsonLd id="star-wars-tycoon-sidekick-legends-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Star Wars Maps", href: "/star-wars-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="COMING SOON / Star Wars Tycoon"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        stats={[
          { label: "Players", value: "1-4" },
          { label: "Mode", value: "Tycoon progression" },
          { label: "Status", value: "Coming soon" },
          { label: "Progress", value: "Auto-save" },
          { label: "Best for", value: "Squads + builders" },
          { label: "Difficulty", value: "Casual grind" },
        ]}
        intro={`Coming soon from NLDEVS: a new Star Wars Tycoon experience with announced island code ${MAP.code}, Sidekick and Hero unlocks, new tycoon sections, workers, Rebirth leaderboard climbing, automatic saves, and up to 4 players.`}
      />

      <ContentSection title="Launch" accent="status">
        <InfoCard heading="COMING SOON">
          Star Wars Tycoon Sidekick Legends is not released yet. The page is
          ready for launch with the announced island code {MAP.code}; check back
          here for the live play status when Epic approval is complete.
        </InfoCard>
      </ContentSection>

      <ContentSection title="Gameplay" accent="features">
        <CenteredList>
          <li>🐶 Unlock all Sidekicks and Heroes.</li>
          <li>🗼 Unlock new sections and upgrades.</li>
          <li>👷 Unlock workers and boost production.</li>
          <li>✨ Climb the leaderboard in Rebirths.</li>
          <li>👥 Up to 4 players.</li>
          <li>🔁 Rebirth and unlock powerful new rewards.</li>
          <li>💾 All progress saves automatically.</li>
        </CenteredList>
      </ContentSection>

      <MapGallery
        title={MAP.title}
        images={[
          { src: "/TycoonSidekicks.jpg", alt: "Star Wars Tycoon Sidekick Legends preview" },
          { src: "/StarWarsRvB.jpg", alt: "Star Wars Mega RvB gameplay preview" },
          { src: "/StarWarsTilted99BotsRoyale.jpg", alt: "Star Wars Tilted 99 Bots Royale preview" },
        ]}
      />

      <ContentSection title="Island code" accent="status">
        <div className="space-y-4 text-center leading-relaxed md:text-left text-gray-400">
          <p>
            Star Wars Tycoon Sidekick Legends is coming soon. The announced
            island code is {MAP.code}; once the map is approved and live, players
            will be able to enter it in Search / Discover to play the new NLDEVS
            Star Wars Tycoon map with Sidekick unlocks, Hero unlocks, workers,
            production boosts, rebirths, and saved progression.
          </p>
          <p>
            Bookmark this page for the Star Wars Tycoon Sidekick Legends island
            code, launch notes, and gameplay details.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <InfoCard heading={`Island code ${MAP.code}`}>
          Star Wars Tycoon Sidekick Legends is coming soon. When it goes live,
          open Fortnite, go to Search / Discover, enter {MAP.code}, then join
          the island.
        </InfoCard>
      </ContentSection>

      <ContentSection title="Why it's" accent="new">
        <p className="text-center leading-relaxed md:text-left text-gray-400">
          Sidekick Legends is the next NLDEVS Star Wars Tycoon launch, built for
          players who want long-term tycoon progression instead of quick one-round
          matches. Automatic saves, rebirths, workers, sections, and upgrades give the map a
          reason to come back after each session.
        </p>
      </ContentSection>

      <ContentSection title="Best for" accent="players who like">
        <CenteredList>
          <li>Fortnite tycoon maps with long-term progression.</li>
          <li>Star Wars-themed tycoon upgrades, Heroes, Sidekicks, and rewards.</li>
          <li>Playing with friends while unlocking new sections and workers.</li>
          <li>Maps with auto-saves, rebirths, production boosts, and repeat goals.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="Star Wars maps">
        <PillLinks
          links={[
            { href: "/star-wars-fortnite-maps", label: "All Star Wars Maps" },
            { href: "/star-wars-mega-rvb", label: "Star Wars Mega RvB" },
            {
              href: "/star-wars-tilted-99-bots-royale",
              label: "Star Wars Tilted 99 Bots Royale",
            },
          ]}
        />
      </ContentSection>

      <ContentSection title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <BackToTop />
    </main>
  );
}
