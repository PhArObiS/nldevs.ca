import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Tilted Squid Royale (99 Bots)",
  code: "1116-7765-9076",
  image: "/TiltedSquidRoyale99Bots.jpeg",
  url: `${SITE_URL}/tilted-squid-royale-99-bots`,
};

export const metadata: Metadata = {
  title: `${MAP.title} Map Code (${MAP.code}) | NLDEVS`,
  description: `Play ${MAP.title} in Fortnite. Map code ${MAP.code}. Squid-inspired Tilted battle royale with bots — great for practice and quick wins.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `${MAP.title} Map Code (${MAP.code}) | NLDEVS`,
    description: `Play ${MAP.title} in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${MAP.title} Map Code (${MAP.code}) | NLDEVS`,
    description: `Play ${MAP.title} in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "Is this a real Squid Game map?",
    a: "It's Squid-style inspired (elimination / high-stakes vibe), not official Netflix content.",
  },
  {
    q: "Why bots?",
    a: "Bots make it ideal for practice, warmups, and quick matches without long queues.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Battle Royale / Bots",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "Squid-inspired Tilted battle royale with bots — great for practice and quick wins.",
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
      <JsonLd id="tilted-squid-schema" data={schema} />
      <JsonLd id="tilted-squid-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Squid Game Maps", href: "/squid-game-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Squid Game / Battle Royale"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="A Squid-inspired battle royale in a Tilted-style environment, built for fast matches and consistent action."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400 md:text-left">
          Tilted Squid Royale (99 Bots) is a Squid-inspired battle royale set
          around a Tilted-style environment, designed for fast matches and
          consistent action. The bot-filled lobby makes it great for warming up
          aim, learning routes, and getting quick wins.
        </p>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Discover</li>
          <li>Enter map code {MAP.code}</li>
          <li>Drop in, loot fast, and rotate early</li>
          <li>Use the bots to practice fights and positioning</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why it's" accent="fun">
        <CenteredList>
          <li>Great practice environment (bots and quick fights)</li>
          <li>Fast &ldquo;one more match&rdquo; pacing</li>
          <li>Good for squads or solo warmups</li>
          <li>Tilted-style nostalgia with a Squid vibe</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
          ]}
        />
      </ContentSection>

      <ContentSection title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <ContentSection title="A quick" accent="note">
        <InfoCard heading="On the Squid Game name">
          &ldquo;Squid&rdquo; is used here to describe gameplay style and
          inspiration. This page is not affiliated with Netflix or the Squid Game
          brand.
        </InfoCard>
      </ContentSection>

      <BackToTop />
    </main>
  );
}
