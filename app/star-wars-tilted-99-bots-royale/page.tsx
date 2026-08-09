import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Star Wars Tilted 99 Bots Royale",
  code: "1116-7765-9076",
  image: "/StarWarsTilted99BotsRoyale.jpg",
  url: `${SITE_URL}/star-wars-tilted-99-bots-royale`,
};

export const metadata: Metadata = {
  title: `Star Wars Tilted 99 Bots Royale Map Code (${MAP.code}) | NLDEVS`,
  description: `Play Star Wars Tilted 99 Bots Royale in Fortnite. Map code ${MAP.code}. 99-bot royale survival with unlockable heroes, bosses, saved stats, loadouts, and Tilted x Star Wars action.`,
  keywords: [
    "Star Wars Tilted 99 Bots Royale",
    "Star Wars 99 bots map code",
    "Fortnite 99 bots royale map",
    "Star Wars Fortnite bot royale",
    "Fortnite PvE survival map",
    "Tilted Star Wars Fortnite map",
    "NLDEVS 99 bots royale",
  ],
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Star Wars Tilted 99 Bots Royale Map Code (${MAP.code}) | NLDEVS`,
    description:
      "Star Wars Tilted 99 Bots Royale by NLDEVS — open-world PvE survival, boss battles, unlockable heroes, saved stats, and loadouts.",
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Star Wars Tilted 99 Bots Royale Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Star Wars Tilted 99 Bots Royale in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "What is the Star Wars Tilted 99 Bots Royale island code?",
    a: `The Star Wars Tilted 99 Bots Royale island code is ${MAP.code}.`,
  },
  {
    q: "Does this map have bots?",
    a: "Yes. It is built around 99-bot royale survival for fast fights, practice, and fun with friends.",
  },
  {
    q: "Does it save stats and loadouts?",
    a: "Yes. The map includes saved stats and loadouts, plus unlockable heroes and boss battles.",
  },
];

export default function StarWarsTilted99BotsRoyalePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    alternateName: [
      "Star Wars 99 Bots Royale",
      "Star Wars Tilted Royale",
      "Tilted 99 Bots Royale",
    ],
    gamePlatform: "Fortnite",
    genre: "Star Wars 99 Bots Royale",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    playMode: "SinglePlayer",
    applicationCategory: "Game",
    keywords:
      "Star Wars Tilted 99 Bots Royale, Fortnite 99 bots, Star Wars bot royale, PvE survival, island code",
    description:
      "Star Wars Tilted 99 Bots Royale is a Fortnite open-world PvE survival map by NLDEVS with 99 bots, boss battles, unlockable heroes, saved stats and loadouts, and Tilted x Star Wars action.",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Island code", value: MAP.code },
      { "@type": "PropertyValue", name: "Map type", value: "99 Bots Royale" },
      { "@type": "PropertyValue", name: "Mode", value: "Open-world PvE survival" },
      { "@type": "PropertyValue", name: "Max players", value: "5" },
      { "@type": "PropertyValue", name: "Progression", value: "Saved stats and loadouts" },
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
      <JsonLd id="star-wars-tilted-99-bots-royale-schema" data={schema} />
      <JsonLd id="star-wars-tilted-99-bots-royale-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Star Wars Maps", href: "/star-wars-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Star Wars / 99 Bots Royale"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="A Star Wars-themed 99-bot royale survival map with boss battles, unlockable heroes, saved stats, saved loadouts, and Tilted action."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400">
          Star Wars Tilted 99 Bots Royale blends bot royale practice with
          Star Wars-themed open-world PvE survival. Drop in, fight through bots,
          unlock heroes, battle bosses, and keep your saved stats and loadouts
          across sessions.
        </p>
      </ContentSection>

      <ContentSection title="Map" accent="features">
        <CenteredList>
          <li>Infinite bot royale action with 99 bots.</li>
          <li>Unlock all-new heroes and fight boss battles.</li>
          <li>Stats and loadouts saved between sessions.</li>
          <li>Tilted Towers x Star Wars theme with friends.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why play" accent="99 Bots Royale">
        <div className="space-y-4 text-center leading-relaxed text-gray-400">
          <p>
            Star Wars Tilted 99 Bots Royale targets players looking for a
            Star Wars Fortnite map code with bot fights, survival pacing, and
            saved progression. The 99-bot setup keeps matches active without
            waiting for full lobbies.
          </p>
          <p>
            Unlockable heroes, boss battles, saved stats, saved loadouts, and a
            Tilted Towers x Star Wars theme make it a strong choice for warmups,
            casual sessions, and replayable PvE action.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter map code {MAP.code}.</li>
          <li>Drop into the royale and start fighting bots.</li>
          <li>Unlock heroes, save loadouts, and climb the leaderboard.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="A quick" accent="note">
        <InfoCard heading="Built for repeat sessions">
          Saved stats and loadouts make this a strong warmup and replay map,
          especially if you want fast fights without waiting on full lobbies.
        </InfoCard>
      </ContentSection>

      <ContentSection title="Similar" accent="Star Wars maps">
        <PillLinks
          links={[
            { href: "/star-wars-fortnite-maps", label: "All Star Wars Maps" },
            { href: "/star-wars-mega-rvb", label: "Star Wars Mega RvB" },
            {
              href: "/star-wars-tycoon-sidekick-legends",
              label: "Star Wars Tycoon Sidekick Legends",
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
