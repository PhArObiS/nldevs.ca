import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.nldevs.ca";

export const metadata: Metadata = {
  title: "Best Fortnite Gun Game Maps & Map Codes | NLDevs",
  description:
    "Browse the best Fortnite Gun Game maps and map codes curated by NLDevs. Fast-paced weapon progression, PvP arenas, and replayable rounds.",
  alternates: {
    canonical: `${SITE_URL}/fortnite-gun-game-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/fortnite-gun-game-maps`,
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDevs",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDevs — weapon progression PvP maps built for replayability.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDevs",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDevs — weapon progression PvP maps built for replayability.",
  },
};

const gunGameMaps: {
  title: string;
  code: string;
  image?: string;
  mode: "Gun Game" | "Team Gun Game" | "FFA Gun Game";
  notes: string;
  // Optional: only enable once you create detail pages
  detailsHref?: string;
}[] = [
  {
    title: "TMNT City — Gun Game",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    mode: "Gun Game",
    notes: "TMNT-themed combat loops with fast weapon progression and replayable rounds.",
    // detailsHref: "/tmnt-city",
  },
  {
    title: "Winterfest Demon Hunters — Gun Game",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "FFA Gun Game",
    notes: "Holiday demon-hunting gun game with repeatable combat XP and weapon rotations.",
  },
//   {
//     title: "Insane Octo Gun Game",
//     code: "0000-0000-0000",
//     image: "/InsaneOctoGunGame.jpeg",
//     mode: "Gun Game",
//     notes: "High-speed gun game chaos. Replace code + image when ready.",
//   },
];

export default function FortniteGunGameMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite Gun Game Maps & Map Codes",
    description:
      "A curated list of Fortnite Gun Game maps and map codes. Fast-paced weapon progression PvP maps curated by NLDevs.",
    url: `${SITE_URL}/fortnite-gun-game-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDevs",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Fortnite Gun Game Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: gunGameMaps.length,
      itemListElement: gunGameMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `Gun Game (${m.mode})`,
          description: `Fortnite Gun Game map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/fortnite-gun-game-maps#${m.code.replaceAll("-", "")}`,
          ...(m.image ? { image: `${SITE_URL}${m.image}` } : {}),
          publisher: {
            "@type": "Organization",
            name: "NLDevs",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  return (
    <main className="px-6 py-12 text-white max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Link href="/" className="text-gray-300 underline">
        ← Back to Favorite Fortnite Maps
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">Best Fortnite Gun Game Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Gun Game maps are fast-paced weapon progression modes where eliminations upgrade your
          loadout. Here are curated Gun Game islands with map codes, images, and quick notes.
        </p>
      </header>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#gun-game-map-codes">
              Gun Game Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#how-to-play-gun-game">
              How to play Gun Game
            </a>
          </li>
        </ul>
      </nav>

      <section id="gun-game-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Gun Game Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Each entry includes a map code, the Gun Game style, and a quick description.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gunGameMaps.map((m) => (
            <article
              key={m.code}
              id={m.code.replaceAll("-", "")}
              className="rounded-lg border border-[#2A0E61] overflow-hidden"
            >
              {m.image ? (
                <div className="relative w-full h-48">
                  <Image
                    src={m.image}
                    alt={`${m.title} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ) : null}

              <div className="p-5">
                <h3 className="text-xl font-semibold">{m.title}</h3>

                <p className="mt-2 text-gray-300">
                  <span className="font-semibold text-white">Map Code:</span> {m.code}
                </p>

                <p className="mt-1 text-gray-400 text-sm">Mode: {m.mode}</p>

                <p className="mt-3 text-gray-300">{m.notes}</p>

                {m.detailsHref ? (
                  <Link
                    href={m.detailsHref}
                    className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200"
                  >
                    View details →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-to-play-gun-game" className="mt-12">
        <h2 className="text-2xl font-semibold">How to play Fortnite Gun Game maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the map code (####-####-####).</li>
          <li>Get eliminations to upgrade weapons.</li>
          <li>First player to finish the weapon list wins (rules vary by map).</li>
        </ol>
      </section>
    </main>
  );
}
