import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.nldevs.ca";

export const metadata: Metadata = {
  title: "Best Squid Game Fortnite Maps & Map Codes | NLDevs",
  description:
    "Browse Squid Game Fortnite maps and map codes curated by NLDevs, including Red vs Blue Squid Minigame and Tilted Squid Royale (99 Bots).",
  alternates: {
    canonical: `${SITE_URL}/squid-game-fortnite-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/squid-game-fortnite-maps`,
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDevs",
    description:
      "Squid Game inspired Fortnite maps and map codes curated by NLDevs — minigames, challenges, and battle royales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDevs",
    description:
      "Squid Game inspired Fortnite maps and map codes curated by NLDevs — minigames, challenges, and battle royales.",
  },
};

const squidMaps: {
  title: string;
  code: string;
  image?: string;
  type: "Minigame" | "RvB" | "Battle Royale" | "Challenge";
  notes: string;
  detailsHref?: string; // optional later
}[] = [
  {
    title: "RvB 🔴🔵 Squid Minigame 🦑",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "RvB",
    notes: "Squid-style minigames with Red vs Blue chaos and fast rounds.",
  },
  {
    title: "Tilted Squid Royale 🏆 (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Battle Royale",
    notes: "Squid-inspired Tilted battle royale with bots — great for practice and quick wins.",
  },
];

export default function SquidGameFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Squid Game Fortnite Maps & Map Codes",
    description:
      "A curated list of Squid Game inspired Fortnite maps and map codes. Includes minigames and battle royale experiences.",
    url: `${SITE_URL}/squid-game-fortnite-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDevs",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Squid Game Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: squidMaps.length,
      itemListElement: squidMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `Squid Game Map (${m.type})`,
          description: `Fortnite map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/squid-game-fortnite-maps#${m.code.replaceAll("-", "")}`,
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
        <h1 className="text-4xl font-bold">Best Squid Game Fortnite Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking for Squid Game style Fortnite experiences? Here are curated Squid-inspired maps
          with map codes, images, and quick notes. We focus on fun minigames, challenges, and
          replayable rounds.
        </p>
      </header>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#squid-map-codes">
              Squid Game Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#how-to-play">
              How to play
            </a>
          </li>
        </ul>
      </nav>

      <section id="squid-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Squid Game Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Enter these codes in Fortnite Discover to play. Each entry includes a gameplay type and
          quick description.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {squidMaps.map((m) => (
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

                <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>

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

      <section id="how-to-play" className="mt-12">
        <h2 className="text-2xl font-semibold">How to play Squid Game Fortnite maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter a map code exactly (####-####-####).</li>
          <li>Join the map and follow the minigame rules (varies by island).</li>
          <li>Play with friends for the best Squid-style elimination rounds.</li>
        </ol>
      </section>

      <section className="mt-12 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
        <p className="text-white font-semibold">Note</p>
        <p className="mt-2">
          “Squid Game” is used here to describe gameplay style and inspiration. This page is not
          affiliated with Netflix or the Squid Game brand.
        </p>
      </section>
    </main>
  );
}
