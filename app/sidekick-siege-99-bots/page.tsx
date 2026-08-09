import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import MapGallery from "@/components/ui/MapGallery";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Sidekick Siege 99 Bots",
  code: "5577-7953-8449",
  image: "/Squid99BotsSidekicks.jpg",
  url: `${SITE_URL}/sidekick-siege-99-bots`,
};

export const metadata: Metadata = {
  title: `Sidekick Siege 99 Bots Map Code (${MAP.code}) | Fortnite`,
  description: `Play Sidekick Siege 99 Bots in Fortnite. Map code ${MAP.code}. A Squid Game 99 bots survival map with sidekicks, boss battles, PvE action, saved stats, ranks, and leaderboards.`,
  keywords: [
    "Sidekick Siege 99 Bots",
    "Sidekick Siege Fortnite",
    "Sidekick Siege map code",
    "Fortnite 99 bots map",
    "Squid Game Fortnite map",
    "Fortnite sidekick map",
    "Fortnite boss battle map",
    "NLDEVS Sidekick Siege",
  ],
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Sidekick Siege 99 Bots Map Code | NLDEVS`,
    description:
      "Sidekick Siege 99 Bots by NLDEVS - sidekicks, infinite bot royale, boss battles, new weapons, wildlife riding, saved stats, ranks, and leaderboards.",
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sidekick Siege 99 Bots Map Code | NLDEVS`,
    description: `Play Sidekick Siege 99 Bots in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const features = [
  "Sidekicks",
  "Infinite bot royale",
  "Boss battle",
  "All new weapons",
  "Wildlife riding",
  "Stats and loadout saved",
  "Resets builds every 20 minutes",
  "Rank system",
  "Leaderboards",
  "Fun with friends",
  "Survival game",
];

const faqs = [
  {
    q: "What is the Sidekick Siege 99 Bots island code?",
    a: `The Sidekick Siege 99 Bots island code is ${MAP.code}.`,
  },
  {
    q: "Does Sidekick Siege 99 Bots include sidekicks?",
    a: "Yes. Sidekicks are one of the main features in Sidekick Siege 99 Bots.",
  },
  {
    q: "How many players can join?",
    a: "Sidekick Siege 99 Bots supports up to 5 players.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    alternateName: ["Sidekick Siege", "99 Bots Sidekick Siege", "Sidekick Siege Fortnite"],
    gamePlatform: "Fortnite",
    genre: "Squid Game / 99 Bots / Survival",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    numberOfPlayers: "1-5",
    playMode: "MultiPlayer",
    applicationCategory: "Game",
    keywords:
      "Sidekick Siege 99 Bots, Fortnite 99 bots, Sidekick Siege Fortnite, Squid Game Fortnite map, boss battle, survival, island code",
    description:
      "Sidekick Siege 99 Bots is a Squid Game Fortnite map by NLDEVS with sidekicks, infinite bot royale, boss battles, new weapons, wildlife riding, saved stats, ranking, leaderboards, and survival gameplay.",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Island code", value: MAP.code },
      { "@type": "PropertyValue", name: "Map type", value: "Squid Game" },
      { "@type": "PropertyValue", name: "Max players", value: "5" },
      { "@type": "PropertyValue", name: "Released", value: "August 3, 2026" },
      { "@type": "PropertyValue", name: "Updated", value: "August 3, 2026" },
      { "@type": "PropertyValue", name: "Version", value: "3" },
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
      <JsonLd id="sidekick-siege-99-bots-schema" data={schema} />
      <JsonLd id="sidekick-siege-99-bots-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Squid Game Maps", href: "/squid-game-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Squid Game / 99 Bots"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        stats={[
          { label: "Players", value: "1-5" },
          { label: "Mode", value: "Sidekick survival" },
          { label: "Status", value: "Live" },
          { label: "Progress", value: "Saved loadouts" },
          { label: "Best for", value: "PvE squads" },
          { label: "Difficulty", value: "Medium" },
        ]}
        intro={`Welcome to 99 Bots: Sidekick Siege. Enter Fortnite island code ${MAP.code} to play a sidekick-focused PvE survival map with boss battles, ranks, leaderboards, saved stats, and up to 5 players.`}
      />

      <ContentSection title="Gameplay" accent="features">
        <CenteredList>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </CenteredList>
      </ContentSection>

      <ContentSection title="Island" accent="details">
        <InfoCard heading={`Island code ${MAP.code}`}>
          Sidekick Siege 99 Bots is a Squid Game survival map for up to 5
          players. Bring sidekicks into 99-bot battles, fight bosses, rank up,
          and keep stats and loadouts saved.
        </InfoCard>
      </ContentSection>

      <MapGallery
        title={MAP.title}
        images={[
          { src: "/Squid99BotsSidekicks.jpg", alt: "Sidekick Siege 99 Bots preview" },
          { src: "/Squid99BotsSidekicks.jpg", alt: "Sidekick Siege 99 Bots gameplay screenshot placeholder" },
          { src: "/Squid99BotsSidekicks.jpg", alt: "Sidekick Siege 99 Bots extra screenshot placeholder" },
        ]}
      />

      <ContentSection title="Why play" accent="this map">
        <CenteredList>
          <li>Sidekick-focused 99-bot survival action.</li>
          <li>Boss battles, PvE combat, and battle royale pacing.</li>
          <li>Rank system and leaderboards for repeat sessions.</li>
          <li>Saved stats and loadouts for progression-minded players.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/99-bots-squid-royale-boss", label: "99 Bots Squid Royale Boss" },
            { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
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
