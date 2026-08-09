import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Star Wars Mega RvB",
  code: "7323-8876-4862",
  image: "/StarWarsRvB.jpg",
  url: `${SITE_URL}/star-wars-mega-rvb`,
};

export const metadata: Metadata = {
  title: `Star Wars Mega RvB Map Code (${MAP.code}) | NLDEVS`,
  description: `Play Star Wars Mega RvB in Fortnite. Map code ${MAP.code}. Red vs Blue team deathmatch with Star Wars weapons, vehicles, custom weapons, achievements, and ranking.`,
  keywords: [
    "Star Wars Mega RvB",
    "Star Wars Mega RvB map code",
    "Star Wars Red vs Blue Fortnite",
    "Fortnite RvB map code",
    "Star Wars weapons Fortnite map",
    "NLDEVS Star Wars Mega RvB",
    "UEFN team deathmatch map",
  ],
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Star Wars Mega RvB Map Code (${MAP.code}) | NLDEVS`,
    description:
      "Star Wars Mega RvB by NLDEVS — Red vs Blue PvP, Star Wars weapons, vehicles, achievements, music, and ranking up to Unreal.",
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Star Wars Mega RvB Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Star Wars Mega RvB in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "What is the Star Wars Mega RvB island code?",
    a: `The Star Wars Mega RvB island code is ${MAP.code}.`,
  },
  {
    q: "What type of map is Star Wars Mega RvB?",
    a: "It is a Red vs Blue team deathmatch PvP map with Star Wars weapons, custom weapons, vehicles, achievements, music, and ranking.",
  },
  {
    q: "Can I unlock vehicles?",
    a: "Yes. Star Wars Mega RvB includes unlockable vehicles and custom weapon progression.",
  },
];

export default function StarWarsMegaRvbPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    alternateName: ["Star Wars Mega Red vs Blue", "Star Wars RvB"],
    gamePlatform: "Fortnite",
    genre: "Star Wars Red vs Blue Team Deathmatch",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    playMode: "MultiPlayer",
    applicationCategory: "Game",
    keywords:
      "Star Wars Mega RvB, Star Wars Red vs Blue Fortnite, Fortnite RvB map code, team deathmatch, Star Wars weapons",
    description:
      "Star Wars Mega RvB is a Fortnite Red vs Blue PvP map by NLDEVS with Star Wars weapons, vehicles, achievements, music, custom weapons, and ranking up to Unreal.",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Island code", value: MAP.code },
      { "@type": "PropertyValue", name: "Map type", value: "Team Deathmatch" },
      { "@type": "PropertyValue", name: "Mode", value: "PvP Red vs Blue" },
      { "@type": "PropertyValue", name: "Max players", value: "20" },
      { "@type": "PropertyValue", name: "Progression", value: "Rank up to Unreal" },
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
      <JsonLd id="star-wars-mega-rvb-schema" data={schema} />
      <JsonLd id="star-wars-mega-rvb-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Star Wars Maps", href: "/star-wars-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Star Wars / Red vs Blue"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="A Star Wars Red vs Blue team deathmatch map with custom weapons, unlockable vehicles, achievements, music, and ranking."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400 md:text-left">
          Star Wars Mega RvB is built for fast PvP sessions with a red team
          versus blue team setup, Star Wars weapons, custom weapon unlocks, and
          ranking progression. Jump in, fight, complete achievements, and push
          toward Unreal.
        </p>
      </ContentSection>

      <ContentSection title="Map" accent="features">
        <CenteredList>
          <li>Star Wars weapons and all-new weapons.</li>
          <li>Team deathmatch PvP with respawns and music.</li>
          <li>Custom weapons, achievements, and unlockable vehicles.</li>
          <li>Rank up to Unreal and compete with friends.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why play" accent="Mega RvB">
        <div className="space-y-4 text-center leading-relaxed text-gray-400 md:text-left">
          <p>
            Star Wars Mega RvB is built for players searching for a Star Wars
            Red vs Blue Fortnite map with immediate action. The focus is simple:
            pick a side, respawn fast, use Star Wars weapons, unlock vehicles,
            and keep fighting.
          </p>
          <p>
            If you want a Star Wars team deathmatch island code with custom
            weapons, achievements, and ranking progression, this is the NLDEVS
            map to start with.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter map code {MAP.code}.</li>
          <li>Choose a side and start fighting.</li>
          <li>Unlock weapons, vehicles, and achievements as you play.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="Star Wars maps">
        <PillLinks
          links={[
            { href: "/star-wars-fortnite-maps", label: "All Star Wars Maps" },
            {
              href: "/star-wars-tycoon-sidekick-legends",
              label: "Star Wars Tycoon Sidekick Legends",
            },
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
