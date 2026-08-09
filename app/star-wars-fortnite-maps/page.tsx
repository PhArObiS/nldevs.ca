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
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/main/Breadcrumbs";
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
  image?: string;
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
    <div className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
      <p className="text-sm text-amber-200">
        <span className="font-semibold">Demo page.</span> The maps below are
        placeholders with fake island codes, and the page is set to{" "}
        <code className="font-mono">noindex</code> so search engines skip it.
        See the comment at the top of this file for the go-live checklist.
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
    isPartOf: {
      "@type": "WebSite",
      name: "NLDEVS",
      url: SITE_URL,
    },
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
          ...(m.image ? { image: `${SITE_URL}${m.image}` } : {}),
          publisher: {
            "@type": "Organization",
            name: "NLDEVS",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      <JsonLd id="starwars-collection-schema" data={pageSchema} />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Star Wars Maps" }]}
      />

      <header className="mt-6">
        <h1 className="text-4xl font-bold">
          Star Wars Fortnite Maps &amp; Island Codes
        </h1>

        <p className="mt-4 text-gray-300 max-w-3xl">
          Star Wars themed Fortnite experiences built with Unreal Editor for
          Fortnite (UEFN). Each entry includes an island code, a short
          description, and the gameplay type.
        </p>

        <p className="mt-3 text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>

        <PlaceholderNotice />
      </header>

      <section id="star-wars-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Star Wars Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Use these codes in Fortnite Discover to play our Star Wars experiences.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {starWarsMaps.map((m) => (
            <article
              key={m.title}
              id={m.code.replaceAll("-", "")}
              className="overflow-hidden rounded-lg border border-edge transition hover:border-neon-cyan/60"
            >
              {m.image ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={m.image}
                    alt={`${m.title} thumbnail`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <h3 className="text-xl font-semibold">{m.title}</h3>

                <p className="mt-2 text-gray-300">
                  <span className="font-semibold text-white">Map Code:</span>{" "}
                  <span className="font-mono">{m.code}</span>
                </p>

                <p className="mt-1 text-sm text-gray-400">Type: {m.type}</p>

                <p className="mt-3 text-gray-300">{m.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-to-play" className="mt-12">
        <h2 className="text-2xl font-semibold">How to play</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the island code exactly (####-####-####).</li>
          <li>Join the island and follow the in-game objectives.</li>
          <li>Favorite the map to find it faster next time.</li>
        </ol>
      </section>

      <section id="related" className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            <Link href="/tmnt-fortnite-maps" className="underline hover:text-white">
              Best TMNT Fortnite Maps
            </Link>
          </li>
          <li>
            <Link
              href="/squid-game-fortnite-maps"
              className="underline hover:text-white"
            >
              Best Squid Game Fortnite Maps
            </Link>
          </li>
          <li>
            <Link
              href="/fortnite-gun-game-maps"
              className="underline hover:text-white"
            >
              Best Fortnite Gun Game Maps
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-sm text-gray-500">
        Community-created Fortnite experiences built with UEFN. Not affiliated
        with Lucasfilm, Disney, or Epic Games.
      </p>

      <div className="mt-8">
        <a href="#top" className="text-sm underline text-gray-400 hover:text-white">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
