import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/tmnt-fortnite-maps";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
  description:
    "Browse TMNT Fortnite maps and map codes by NLDEVS, including TMNT Mega Ramp Survival and TMNT City — built with UEFN.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
    description:
      "TMNT Fortnite maps and map codes by NLDEVS — TMNT Mega Ramp Survival and TMNT City.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
    description:
      "TMNT Fortnite maps and map codes by NLDEVS — TMNT Mega Ramp Survival and TMNT City.",
  },
};

const tmntMaps: {
  title: string;
  code: string;
  image: string;
  type: "Survival" | "Adventure" | "Gun Game" | "PvP" | "Experience";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Survival",
    notes:
      "High-speed Mega Ramp survival with TMNT theme. Dodge chaos and survive the run.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Experience",
    notes:
      "TMNT-themed city experience built in UEFN — explore, fight, and chill with friends.",
    detailsHref: "/tmnt-city",
  },
];

const faqs = [
  {
    q: "How do I enter a Fortnite map code?",
    a: "Open Fortnite, go to Search/Discover, enter the island code (####-####-####), then select the result to play.",
  },
  {
    q: "Are these TMNT Fortnite maps official?",
    a: "These are community-created Fortnite experiences built with UEFN. This page is not affiliated with Nickelodeon or the TMNT brand.",
  },
  {
    q: "What is TMNT Mega Ramp Survival?",
    a: "A fast-paced survival experience focused on dodging hazards and staying alive as chaos increases on a mega ramp.",
  },
  {
    q: "Is TMNT City a gun game map?",
    a: "TMNT City is primarily a TMNT-themed city experience. Depending on the island's current version, it may include combat areas or game modes.",
  },
];

export default function TMNTFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best TMNT Fortnite Maps & Map Codes",
    description:
      "A curated list of Teenage Mutant Ninja Turtles (TMNT) Fortnite maps and map codes built with UEFN by NLDEVS.",
    url: `${SITE_URL}${PAGE_PATH}`,
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
    about: [
      "TMNT Fortnite maps",
      "Teenage Mutant Ninja Turtles Fortnite",
      "Fortnite map codes",
      "UEFN TMNT islands",
      "TMNT Mega Ramp Survival",
      "TMNT City",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "TMNT Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: tmntMaps.length,
      itemListElement: tmntMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `TMNT Fortnite Map (${m.type})`,
          description: `Fortnite map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}${PAGE_PATH}#${m.code.replaceAll("-", "")}`,
          image: `${SITE_URL}${m.image}`,
          publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
        },
      })),
    },
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
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="tmnt-collection-schema" data={pageSchema} />
      <JsonLd id="tmnt-faq-schema" data={faqSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "TMNT Maps" }]}
        eyebrow="Turtle power"
        title="Best TMNT"
        accent="Fortnite maps"
        description="TMNT-themed Fortnite experiences built with Unreal Editor for Fortnite. Each entry includes an island code, description, and gameplay type."
        lastUpdated={LAST_UPDATED}
      />

      <ContentSection title="What are" accent="TMNT Fortnite maps?">
        <div className="space-y-4 text-center leading-relaxed text-gray-400 md:text-left">
          <p>
            TMNT Fortnite maps are community-made islands inspired by Teenage
            Mutant Ninja Turtles themes — city exploration, survival runs, combat
            arenas, and fast-paced mini-games. These islands are built with UEFN
            and designed for replayability with friends.
          </p>
          <p>
            If you&apos;re looking for high-speed action, survival maps like Mega
            Ramp modes are great for quick sessions. If you want more freedom,
            city experience maps are ideal for exploring, fighting, and hanging
            out with a party.
          </p>
        </div>
      </ContentSection>

      <ContentSection title="TMNT map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          stagger={0.07}
        >
          {tmntMaps.map((m, i) => (
            <RevealItem key={m.code} className="h-full">
              <div id={m.code.replaceAll("-", "")} className="h-full">
                <FortniteMapsCard
                  src={m.image}
                  title={m.title}
                  code={m.code}
                  mode={m.type}
                  notes={m.notes}
                  href={m.detailsHref}
                  priority={i < 2}
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection title="Tips for" accent="TMNT maps">
        <CenteredList>
          <li>
            Play with friends — survival runs and city maps are more fun with a
            party.
          </li>
          <li>
            Mega Ramp tip: stay centered and make small corrections early instead
            of big turns late.
          </li>
          <li>
            Favorite the map after playing so it&apos;s easier to return after
            updates.
          </li>
          <li>
            If you want PvP, head into combat zones or gun game modes when
            available.
          </li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the map code exactly (####-####-####).</li>
          <li>Join the island and follow the in-game objectives.</li>
          <li>Favorite the map to find it faster next time.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection id="faq" title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <ContentSection title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/best-fortnite-xp-maps", label: "XP Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/star-wars-fortnite-maps", label: "Star Wars Maps" },
          ]}
        />
      </ContentSection>

      <BackToTop />
    </main>
  );
}
