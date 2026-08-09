/**
 * DEMO PAGE — placeholder content.
 *
 * Built to the same structure as the other hub pages so it is ready to fill in,
 * but nothing here is real yet. Before this goes live:
 *
 *   1. Replace the entries in `starWarsMaps` with real titles, island codes,
 *      and screenshots (drop the images in /public).
 *   2. Delete the <PlaceholderNotice /> block below.
 *   3. Remove `robots: { index: false }` from the metadata export.
 *   4. Add "/star-wars-fortnite-maps" to HUB_ROUTES in app/sitemap.ts.
 *
 * Until then the page is noindex and absent from the sitemap on purpose —
 * placeholder island codes indexed by Google would send players to nothing.
 */
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/star-wars-fortnite-maps";
const LAST_UPDATED = "August 2026";

export const metadata: Metadata = {
  title: "Star Wars Fortnite Maps & Island Codes | NLDEVS",
  description:
    "Star Wars themed Fortnite maps and island codes built with UEFN by NLDEVS.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  // Placeholder content — do not index until the real maps are in.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Star Wars Fortnite Maps & Island Codes | NLDEVS",
    description:
      "Star Wars themed Fortnite maps and island codes built with UEFN by NLDEVS.",
  },
};

const starWarsMaps: {
  title: string;
  code: string;
  image: string;
  type: "Survival" | "Adventure" | "Gun Game" | "PvP" | "Experience";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "Placeholder — Star Wars Map One",
    code: "0000-0000-0000",
    // Demo art: reusing an existing screenshot until real captures exist.
    image: "/MegaRampSurvival.jpeg",
    type: "Survival",
    notes:
      "Placeholder entry. Swap in the real title, island code, and screenshot.",
  },
  {
    title: "Placeholder — Star Wars Map Two",
    code: "0000-0000-0000",
    image: "/CityTMNT.jpeg",
    type: "Experience",
    notes:
      "Placeholder entry. Swap in the real title, island code, and screenshot.",
  },
  {
    title: "Placeholder — Star Wars Map Three",
    code: "0000-0000-0000",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    type: "Gun Game",
    notes:
      "Placeholder entry. Swap in the real title, island code, and screenshot.",
  },
];

function PlaceholderNotice() {
  return (
    <div className="clip-corner mt-8 border border-amber-500/40 bg-amber-500/10 p-5 text-center md:text-left">
      <p className="text-sm leading-relaxed text-amber-200">
        <span className="font-semibold">Demo page.</span> The maps below are
        placeholders with fake island codes, and the page is set to{" "}
        <code className="font-mono">noindex</code> so search engines skip it. See
        the comment at the top of this file for the go-live checklist.
      </p>
    </div>
  );
}

export default function StarWarsFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Star Wars Fortnite Maps & Island Codes",
    description:
      "Star Wars themed Fortnite maps and island codes built with UEFN by NLDEVS.",
    url: `${SITE_URL}${PAGE_PATH}`,
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      name: "Star Wars Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: starWarsMaps.length,
      itemListElement: starWarsMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `Star Wars Fortnite Map (${m.type})`,
          description: `Fortnite island code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}${PAGE_PATH}#${m.code.replaceAll("-", "")}`,
          image: `${SITE_URL}${m.image}`,
          publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
        },
      })),
    },
  };

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="starwars-collection-schema" data={pageSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Star Wars Maps" }]}
        eyebrow="A galaxy far, far away"
        title="Star Wars"
        accent="Fortnite maps"
        description="Star Wars themed Fortnite experiences built with Unreal Editor for Fortnite. Each entry includes an island code and gameplay type."
        lastUpdated={LAST_UPDATED}
      >
        <PlaceholderNotice />
      </PageHeader>

      <ContentSection title="Star Wars map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {starWarsMaps.map((m, i) => (
            <RevealItem key={m.title} className="h-full">
              <div id={m.code.replaceAll("-", "")} className="h-full">
                <FortniteMapsCard
                  src={m.image}
                  title={m.title}
                  code={m.code}
                  mode={m.type}
                  notes={m.notes}
                  href={m.detailsHref}
                  priority={i < 3}
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the island code exactly (####-####-####).</li>
          <li>Join the island and follow the in-game objectives.</li>
          <li>Favorite the map to find it faster next time.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
            { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/best-fortnite-xp-maps", label: "XP Maps" },
          ]}
        />
      </ContentSection>

      <p className="mt-16 text-center text-sm text-gray-500 md:text-left">
        Community-created Fortnite experiences built with UEFN. Not affiliated
        with Lucasfilm, Disney, or Epic Games.
      </p>

      <BackToTop />
    </main>
  );
}
