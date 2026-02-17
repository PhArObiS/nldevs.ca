import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Breadcrumbs from "@/components/main/Breadcrumbs";

const SITE_URL = "https://www.nldevs.ca";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
  description:
    "Browse the best Fortnite Gun Game maps and map codes curated by NLDEVS. Fast-paced weapon progression, PvP arenas, and replayable rounds.",
  alternates: {
    canonical: `${SITE_URL}/fortnite-gun-game-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/fortnite-gun-game-maps`,
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDEVS — weapon progression PvP maps built for replayability.",
  },
};

const gunGameMaps = [
  {
    title: "TMNT City — Gun Game",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    mode: "Gun Game",
    notes:
      "TMNT-themed combat loops with fast weapon progression and replayable rounds.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "Winterfest Demon Hunters — Gun Game",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "FFA Gun Game",
    notes:
      "Holiday demon-hunting gun game with repeatable combat loops and weapon rotations.",
    detailsHref: "/winterfest-demon-hunters",
  },
];

export default function FortniteGunGameMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite Gun Game Maps",
    url: `${SITE_URL}/fortnite-gun-game-maps`,
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      {/* ✅ JSON-LD */}
      <Script id="gungame-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>

      {/* ✅ GLOBAL BREADCRUMBS */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Gun Game Maps" },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-4xl font-bold">
          Best Fortnite Gun Game Maps & Map Codes
        </h1>

        <p className="mt-4 text-gray-300 max-w-3xl">
          Gun Game maps are fast-paced weapon progression modes where
          eliminations upgrade your loadout. Here are curated Gun Game islands
          with map codes, images, and quick notes.
        </p>

        <p className="mt-3 text-sm text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      {/* WHAT IS GUN GAME */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          What is a Fortnite Gun Game map?
        </h2>

        <div className="mt-3 text-gray-300 space-y-4">
          <p>
            Fortnite Gun Game is a weapon progression PvP mode built for quick,
            replayable rounds. Players start with a weapon and upgrade after
            each elimination.
          </p>

          <p>
            The goal is to finish the weapon list before everyone else. Great
            Gun Game maps have strong flow, balanced weapon rotations, and fast
            respawns.
          </p>
        </div>
      </section>

      {/* MAP LIST */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Gun Game Map Codes</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gunGameMaps.map((m) => {
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

                  <p className="mt-1 text-gray-400 text-sm">Mode: {m.mode}</p>

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

      {/* TIPS */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Tips to win Gun Game rounds</h2>

        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>Learn spawn flow and rotate fights.</li>
          <li>Hold angles and re-peek smart.</li>
          <li>Mid-range accuracy beats flashy plays.</li>
          <li>Keep moving to upgrade weapons faster.</li>
        </ul>
      </section>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>

        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            <Link href="/best-fortnite-xp-maps" className="underline">
              Best Fortnite XP Maps
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
