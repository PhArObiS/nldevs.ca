import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "RvB Squid Minigame",
  code: "2720-5344-3341",
  image: "/RedVsBlueSquidMinigame.jpg",
  url: `${SITE_URL}/rvb-squid-minigame`,
};

export const metadata: Metadata = {
  title: `RvB Squid Minigame Map Code (${MAP.code}) | NLDEVS`,
  description: `Play RvB Squid Minigame in Fortnite. Map code ${MAP.code}. Fast rounds, team chaos, and replayable minigames.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `RvB Squid Minigame Map Code (${MAP.code}) | NLDEVS`,
    description: `Play RvB Squid Minigame in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `RvB Squid Minigame Map Code (${MAP.code}) | NLDEVS`,
    description: `Play RvB Squid Minigame in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "Is this a Squid Game map?",
    a: "It's Squid-style inspired minigames with a Red vs Blue format.",
  },
  {
    q: "Can I play with friends?",
    a: "Yes — it's best with squads/parties.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Red vs Blue / Minigames",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description: "Squid-style minigames with Red vs Blue chaos and fast rounds.",
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
      <JsonLd id="rvb-squid-schema" data={schema} />
      <JsonLd id="rvb-squid-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Squid Game Maps", href: "/squid-game-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Squid Game / RvB"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="A fast-paced Red vs Blue experience inspired by Squid-style challenges — built for quick rounds and constant action."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400 md:text-left">
          RvB Squid Minigame is a fast-paced Red vs Blue experience inspired by
          Squid-style challenges. It&apos;s built for quick rounds, constant
          action, and &ldquo;run it back&rdquo; replayability.
        </p>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Enter map code {MAP.code} in Discover</li>
          <li>Join a team</li>
          <li>Play through fast minigame rounds</li>
          <li>Win rounds with teamwork and eliminations</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why it's" accent="fun">
        <CenteredList>
          <li>Short rounds mean high replay value</li>
          <li>Red vs Blue chaos with friends</li>
          <li>Competitive and easy to understand</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/best-fortnite-xp-maps", label: "Best XP Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
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
