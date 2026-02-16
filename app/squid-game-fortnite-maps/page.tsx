import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const SITE_URL = "https://www.nldevs.ca";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
  description:
    "Browse Squid Game Fortnite maps and map codes curated by NLDEVS, including Red vs Blue Squid Minigame and Tilted Squid Royale (99 Bots).",
  alternates: {
    canonical: `${SITE_URL}/squid-game-fortnite-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/squid-game-fortnite-maps`,
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
    description:
      "Squid Game inspired Fortnite maps and map codes curated by NLDEVS — minigames, challenges, and battle royales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
    description:
      "Squid Game inspired Fortnite maps and map codes curated by NLDEVS — minigames, challenges, and battle royales.",
  },
};

const squidMaps: {
  title: string;
  code: string;
  image?: string;
  type: "Minigame" | "RvB" | "Battle Royale" | "Challenge";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "RvB 🔴🔵 Squid Minigame 🦑",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "RvB",
    notes: "Squid-style minigames with Red vs Blue chaos and fast rounds.",
    detailsHref: "/rvb-squid-minigame",
  },
  {
    title: "Tilted Squid Royale 🏆 (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Battle Royale",
    notes:
      "Squid-inspired Tilted battle royale with bots — great for practice and quick wins.",
    detailsHref: "/tilted-squid-royale-99-bots", // ✅ FIX: makes card clickable
  },
];

export default function SquidGameFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Squid Game Fortnite Maps & Map Codes",
    description:
      "A curated list of Squid Game inspired Fortnite maps and map codes.",
    url: `${SITE_URL}/squid-game-fortnite-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDEVS",
      url: SITE_URL,
    },
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      {/* JSON-LD */}
      <Script id="squid-collection-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-sm flex flex-wrap gap-2 text-gray-300"
      >
        <Link href="/" className="underline hover:text-white">
          Home
        </Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-200">Squid Game Maps</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">
          Best Squid Game Fortnite Maps &amp; Map Codes
        </h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking for Squid Game style Fortnite experiences? Here are curated
          Squid-inspired maps with map codes, images, and quick notes.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      {/* MAP CARDS */}
      <section id="squid-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Squid Game Map Codes</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {squidMaps.map((m) => {
            const CardInner = (
              <>
                {m.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={m.image}
                      alt={`${m.title} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-semibold">{m.title}</h3>

                  <p className="mt-2 text-gray-300">
                    <span className="font-semibold text-white">
                      Map Code:
                    </span>{" "}
                    {m.code}
                  </p>

                  <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>
                  <p className="mt-3 text-gray-300">{m.notes}</p>

                  {m.detailsHref && (
                    <span className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200">
                      View details →
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <article
                key={m.code}
                id={m.code.replaceAll("-", "")}
                className="rounded-lg border border-[#2A0E61] overflow-hidden hover:border-cyan-400 transition cursor-pointer"
              >
                {m.detailsHref ? (
                  <Link href={m.detailsHref} className="block">
                    {CardInner}
                  </Link>
                ) : (
                  CardInner
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Back to top */}
      <div className="mt-12">
        <a
          href="#top"
          className="text-sm underline text-gray-400 hover:text-white"
        >
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
