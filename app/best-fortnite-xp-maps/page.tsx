import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Breadcrumbs from "@/components/main/Breadcrumbs";

const SITE_URL = "https://www.nldevs.ca";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDEVS",
  description:
    "Best Fortnite XP maps and map codes to help you level up efficiently. Curated by NLDEVS with quick summaries and updated picks.",
  alternates: {
    canonical: `${SITE_URL}/best-fortnite-xp-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/best-fortnite-xp-maps`,
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDEVS",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDEVS.",
  },
};

const xpMaps = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Active",
    notes:
      "Fast-paced survival runs with repeatable gameplay loops. Great if you prefer active play while leveling.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    type: "Mixed",
    notes:
      "Combat-focused loops with repeatable rounds. Works well for players who want XP while fighting.",
    detailsHref: "/winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    type: "Mixed",
    notes:
      "Team-based objectives and longer sessions. Good for steady XP while playing PvP-style rounds.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Active",
    notes: "Exploration + combat routes with consistent XP loops.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "Active",
    notes: "Fast rounds and objective-based play.",
    detailsHref: "/rvb-squid-minigame",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Mixed",
    notes: "Battle royale vs bots with repeatable matches.",
    detailsHref: "/tilted-squid-royale-99-bots",
  },
];

export default function BestFortniteXpMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite XP Maps",
    url: `${SITE_URL}/best-fortnite-xp-maps`,
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      <Script id="xp-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>

      {/* ✅ GLOBAL BREADCRUMBS */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "XP Maps" },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-4xl font-bold">
          Best Fortnite XP Maps & Map Codes
        </h1>

        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking to level up fast? Here are curated Fortnite XP maps with map
          codes and quick notes.
        </p>

        <p className="mt-3 text-sm text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      {/* XP MAP LIST */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">XP Map Codes</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {xpMaps.map((m) => {
            const Card = (
              <>
                {m.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-semibold">{m.title}</h3>

                  <p className="mt-2 text-gray-300">
                    <span className="font-semibold text-white">Map Code:</span>{" "}
                    {m.code}
                  </p>

                  <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>
                  <p className="mt-3 text-gray-300">{m.notes}</p>

                  {m.detailsHref ? (
                    <span className="inline-block mt-4 text-cyan-300 underline">
                      View details →
                    </span>
                  ) : (
                    <span className="inline-block mt-4 text-gray-500 text-sm">
                      Details page coming soon
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <article
                key={m.code}
                className="rounded-lg border border-[#2A0E61] overflow-hidden hover:border-cyan-400 transition"
              >
                {m.detailsHref ? (
                  <Link href={m.detailsHref}>{Card}</Link>
                ) : (
                  Card
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>

        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            <Link href="/fortnite-gun-game-maps" className="underline">
              Best Fortnite Gun Game Maps
            </Link>
          </li>
          <li>
            <Link href="/tmnt-fortnite-maps" className="underline">
              Best TMNT Fortnite Maps
            </Link>
          </li>
          <li>
            <Link href="/squid-game-fortnite-maps" className="underline">
              Best Squid Game Fortnite Maps
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-12">
        <a href="#top" className="text-sm underline text-gray-400">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
