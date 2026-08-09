import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "99 Bots Squid Royale Boss",
  code: "0596-3765-4845",
  image: "/99 Bots Squid Royale Boss.jpg",
  url: `${SITE_URL}/99-bots-squid-royale-boss`,
};

export const metadata: Metadata = {
  title: `99 Bots Squid Royale Boss Map Code (${MAP.code}) | Fortnite`,
  description: `Play 99 Bots Squid Royale Boss in Fortnite. Map code ${MAP.code}. A Squid Game 99 bots survival map with PvE, open world action, boss battles, saved stats, ranking, and leaderboards.`,
  keywords: [
    "99 Bots Squid Royale Boss",
    "99 Bots Squid Royale",
    "Squid Royale Boss map code",
    "Fortnite 99 bots map",
    "Squid Game Fortnite map",
    "Fortnite boss battle map",
    "Fortnite survival map code",
    "NLDEVS Squid Game map",
  ],
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `99 Bots Squid Royale Boss Map Code | NLDEVS`,
    description:
      "99 Bots Squid Royale Boss by NLDEVS - infinite bot royale, boss battle events, new weapons, wildlife riding, saved stats, ranks, and leaderboards.",
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `99 Bots Squid Royale Boss Map Code | NLDEVS`,
    description: `Play 99 Bots Squid Royale Boss in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const features = [
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
    q: "What is the 99 Bots Squid Royale Boss island code?",
    a: `The 99 Bots Squid Royale Boss island code is ${MAP.code}.`,
  },
  {
    q: "Is 99 Bots Squid Royale Boss a Squid Game Fortnite map?",
    a: "Yes. It is a Squid Game-style Fortnite map by NLDEVS with 99 bots, PvE survival, boss battles, and open-world action.",
  },
  {
    q: "How many players can join?",
    a: "99 Bots Squid Royale Boss supports up to 5 players.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    alternateName: ["99 Bots Squid Royale", "Squid Royale Boss", "99 Bots Boss"],
    gamePlatform: "Fortnite",
    genre: "Squid Game / 99 Bots / Survival",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    numberOfPlayers: "1-5",
    playMode: "MultiPlayer",
    applicationCategory: "Game",
    keywords:
      "99 Bots Squid Royale Boss, Fortnite 99 bots, Squid Game Fortnite map, boss battle, survival, island code",
    description:
      "99 Bots Squid Royale Boss is a Squid Game Fortnite map by NLDEVS with infinite bot royale, boss battles, new weapons, wildlife riding, saved stats, rankings, leaderboards, and survival gameplay.",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Island code", value: MAP.code },
      { "@type": "PropertyValue", name: "Map type", value: "Squid Game" },
      { "@type": "PropertyValue", name: "Max players", value: "5" },
      { "@type": "PropertyValue", name: "Released", value: "February 25, 2026" },
      { "@type": "PropertyValue", name: "Updated", value: "July 18, 2026" },
      { "@type": "PropertyValue", name: "Version", value: "27" },
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
      <JsonLd id="99-bots-squid-royale-boss-schema" data={schema} />
      <JsonLd id="99-bots-squid-royale-boss-faq-schema" data={faqSchema} />

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
          { label: "Mode", value: "99 Bots survival" },
          { label: "Status", value: "Live" },
          { label: "Progress", value: "Saved stats" },
          { label: "Best for", value: "Boss battles" },
          { label: "Difficulty", value: "Medium" },
        ]}
        intro={`Welcome to Squid Royale. Enter Fortnite island code ${MAP.code} to play an open-world PvE 99 bots survival map with boss battles, ranks, leaderboards, saved stats, and new weapons.`}
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
          99 Bots Squid Royale Boss is a Squid Game survival map for up to 5
          players. Eliminate bots to rank up, join boss battle events, and keep
          your stats saved across sessions.
        </InfoCard>
      </ContentSection>

      <ContentSection title="Why play" accent="this map">
        <CenteredList>
          <li>Open-world PvE survival with constant bot action.</li>
          <li>Boss battle events for bigger fights and rewards.</li>
          <li>Rank system and leaderboards for repeat goals.</li>
          <li>Stats and loadouts saved for returning players.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/sidekick-siege-99-bots", label: "Sidekick Siege 99 Bots" },
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
