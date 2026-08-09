import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, InfoCard, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "Winterfest Demon Hunters",
  code: "6101-7751-8665",
  image: "/WinterfestDemonHuntersGunGame.jpeg",
  url: `${SITE_URL}/winterfest-demon-hunters`,
};

export const metadata: Metadata = {
  title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
  description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}. Combat-focused rounds with repeatable loops — great for squads and leveling while fighting.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "Is this a Gun Game map?",
    a: "It's a combat-focused experience with repeatable rounds. Some versions play like a gun game/rotation loop — follow the in-map rules for the current build.",
  },
  {
    q: "Does it give XP?",
    a: "XP depends on Fortnite calibration and the island's current settings. XP rates can change after updates or revisions.",
  },
  {
    q: "Can I play with friends?",
    a: "Yes — this one is best with squads/parties for faster rounds.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Gun Game / PvE Combat",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "Holiday demon-hunting gun game with weapon rotations and repeatable combat loops.",
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
      <JsonLd id="winterfest-demon-hunters-schema" data={schema} />
      <JsonLd id="winterfest-demon-hunters-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gun Game Maps", href: "/fortnite-gun-game-maps" },
          { label: MAP.title },
        ]}
        eyebrow="Gun Game / FFA"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="A combat-focused experience built for repeatable rounds — action-first gameplay with steady session XP, depending on calibration."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400 md:text-left">
          Jump into Winterfest Demon Hunters for fast-paced combat loops, weapon
          rotations, and replayable rounds. It&apos;s designed to keep the action
          moving — great for squads who want constant fights and quick re-queues.
        </p>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover</li>
          <li>Enter map code {MAP.code}</li>
          <li>Join the island and follow the in-map objectives</li>
          <li>Stay active in fights to maximize match flow (and XP, if available)</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why it's" accent="fun">
        <CenteredList>
          <li>Combat-focused rounds with repeatable loops</li>
          <li>Great with friends (squads/parties)</li>
          <li>Weapon variety and &ldquo;one more round&rdquo; pacing</li>
          <li>Good option when you want XP while actually playing</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Tips" accent="and tactics">
        <CenteredList>
          <li>Play with a party to keep rounds moving and reduce downtime.</li>
          <li>
            If XP slows down, rotate maps (calibration and diminishing returns
            can vary).
          </li>
          <li>
            Focus on consistent mid-range fights — fast eliminations keep
            momentum high.
          </li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/best-fortnite-xp-maps", label: "Best XP Maps" },
            { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
          ]}
        />
      </ContentSection>

      <ContentSection title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <ContentSection title="A quick" accent="note">
        <InfoCard heading="On XP availability">
          XP availability can change with Fortnite updates and calibration. This
          page focuses on normal, repeatable gameplay loops — not exploits.
        </InfoCard>
      </ContentSection>

      <BackToTop />
    </main>
  );
}
