import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { SITE_URL } from "@/constants/site";

const MAP = {
  title: "TMNT City",
  code: "1383-6989-3967",
  image: "/CityTMNT.jpg",
  url: `${SITE_URL}/tmnt-city`,
};

export const metadata: Metadata = {
  title: `TMNT City Map Code (${MAP.code}) | NLDEVS`,
  description: `Explore TMNT City in Fortnite. Map code ${MAP.code}. A TMNT-themed city experience built with UEFN by NLDEVS.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `TMNT City Map Code (${MAP.code}) | NLDEVS`,
    description: `Explore TMNT City in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `TMNT City Map Code (${MAP.code}) | NLDEVS`,
    description: `Explore TMNT City in Fortnite. Map code ${MAP.code}.`,
    images: [`${SITE_URL}${MAP.image}`],
  },
};

const faqs = [
  {
    q: "Is TMNT City a gun game?",
    a: "It's more of an experience/exploration map with action elements.",
  },
  {
    q: "How do I find it in Fortnite?",
    a: `Discover → enter ${MAP.code}.`,
  },
];

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Experience",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "TMNT-themed city experience built in UEFN — explore, fight, and chill with friends.",
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
      <JsonLd id="tmnt-city-schema" data={schema} />
      <JsonLd id="tmnt-city-faq-schema" data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "TMNT Maps", href: "/tmnt-fortnite-maps" },
          { label: MAP.title },
        ]}
        eyebrow="TMNT / Experience"
        title={MAP.title}
        code={MAP.code}
        image={MAP.image}
        intro="An immersive city-style TMNT experience built in UEFN — explore, fight, and hang out with friends."
      />

      <ContentSection title="Gameplay" accent="description">
        <p className="text-center leading-relaxed text-gray-400">
          TMNT City is an immersive city-style TMNT experience built in UEFN.
          Explore, fight, and hang out with friends in a themed environment
          designed for repeat visits.
        </p>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Enter map code {MAP.code} in Fortnite Discover</li>
          <li>Load in and explore the city</li>
          <li>Follow in-map objectives and activities</li>
          <li>Play with friends for the best vibe</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Why it's" accent="fun">
        <CenteredList>
          <li>Strong TMNT atmosphere</li>
          <li>Exploration and combat loops</li>
          <li>Great &ldquo;hangout&rdquo; map for squads</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Similar" accent="maps">
        <PillLinks
          links={[
            { href: "/tmnt-mega-ramp-survival", label: "TMNT Mega Ramp Survival" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/tmnt-fortnite-maps", label: "All TMNT Maps" },
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
