import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "TMNT Mega Ramp Survival",
  code: "0556-7584-6565",
  image: "/MegaRampSurvival.jpeg",
  url: `${SITE_URL}/tmnt-mega-ramp-survival`,
};

export const metadata: Metadata = {
  title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
  description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}. High-speed survival gameplay built with UEFN by NLDEVS.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
    description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
    description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "How do I play this map?",
    a: `Enter the code ${MAP.code} in Fortnite Discover.`,
  },
  {
    q: "Is it multiplayer?",
    a: "Yes — it's fun solo or with a party.",
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Survival",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "High-speed ramp survival Fortnite experience built with UEFN by NLDEVS.",
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
      <JsonLd id="tmnt-mega-ramp-schema" data={schema} />
      <JsonLd id="tmnt-mega-ramp-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "TMNT Maps", href: "/tmnt-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="TMNT / Survival"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        stats={[
          { label: "Players", value: "Solo / party" },
          { label: "Mode", value: "Mega ramp survival" },
          { label: "Status", value: "Live" },
          { label: "Round length", value: "Quick runs" },
          { label: "Best for", value: "Movement chaos" },
          { label: "Difficulty", value: "Easy to jump in" },
        ]}
        intro="A high-speed survival experience where players race up a massive ramp while avoiding hazards and surviving as long as possible."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed md:text-left text-gray-400">
          TMNT Mega Ramp Survival is a high-speed survival experience where
          players race up a massive ramp while avoiding hazards and surviving as
          long as possible.
        </p>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Discover</li>
          <li>Enter map code {MAP.code}</li>
          <li>Join the island and start a run</li>
          <li>Survive longer to improve your score</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why it's" accent="fun">
        <CenteredList>
          <li>Quick &ldquo;one more run&rdquo; replayability</li>
          <li>High-speed movement and chaos</li>
          <li>Great solo or with friends</li>
          <li>Strong TMNT theme</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/tmnt-city", label: "TMNT City" },
            { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
            { href: "/best-fortnite-xp-maps", label: "Best XP Maps" },
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
