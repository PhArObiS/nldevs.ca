import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://www.nldevs.ca";
const MAP = {
  title: "Winterfest Demon Hunters",
  code: "6101-7751-8665",
  image: "/WinterfestDemonHuntersGunGame.jpeg",
  url: `${SITE_URL}/winterfest-demon-hunters`,
};

export const metadata: Metadata = {
  title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
  description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}. Combat-focused rounds with repeatable loops—great for squads and leveling while fighting.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Winterfest Demon Hunters Map Code (${MAP.code}) | NLDEVS`,
    description: `Play Winterfest Demon Hunters in Fortnite. Map code ${MAP.code}.`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Gun Game / PvE Combat",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "Winterfest Demon Hunters is a combat-focused Fortnite experience with repeatable rounds—great for squads, weapon rotations, and active play.",
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
  };

  return (
    <main id="top" className="max-w-5xl mx-auto px-6 py-12 text-gray-300">
      <Script id="winterfest-demon-hunters-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm flex flex-wrap gap-2 text-gray-300">
        <Link href="/" className="underline hover:text-white">
          Home
        </Link>
        <span className="text-gray-500">/</span>
        <Link href="/fortnite-gun-game-maps" className="underline hover:text-white">
          Gun Game Maps
        </Link>
        <span className="text-gray-500">/</span>
        <Link href="/best-fortnite-xp-maps" className="underline hover:text-white">
          XP Maps
        </Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-200">{MAP.title}</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-4xl font-bold text-white">{MAP.title}</h1>
        <p className="mt-3 text-gray-300 max-w-3xl">
          Winterfest Demon Hunters is a combat-focused experience built for repeatable rounds.
          It’s a solid pick if you want action-first gameplay while still getting steady session XP
          (depending on calibration).
        </p>
      </header>

      <div className="mt-6 p-6 border border-[#2A0E61] rounded-lg">
        <p className="text-xl">
          <span className="font-semibold text-white">Map Code:</span> {MAP.code}
        </p>
      </div>

      <h2 className="text-2xl text-white mt-12">Screenshots</h2>
      <Image
        src={MAP.image}
        alt={`${MAP.title} Fortnite gameplay`}
        width={1200}
        height={700}
        className="rounded-lg mt-4"
        priority={false}
      />

      <h2 className="text-2xl text-white mt-12">Gameplay Description</h2>
      <p className="mt-3">
        Jump into Winterfest Demon Hunters for fast-paced combat loops, weapon rotations, and
        replayable rounds. It’s designed to keep the action moving—great for squads who want
        constant fights and quick re-queues.
      </p>

      <h2 className="text-2xl text-white mt-12">How to Play</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Open Fortnite → Search / Discover</li>
        <li>Enter map code {MAP.code}</li>
        <li>Join the island and follow the in-map objectives</li>
        <li>Stay active in fights to maximize match flow (and XP, if available)</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Why It’s Fun</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Combat-focused rounds with repeatable loops</li>
        <li>Great with friends (squads/parties)</li>
        <li>Weapon variety + “one more round” pacing</li>
        <li>Good option when you want XP while actually playing</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Tips</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Play with a party to keep rounds moving and reduce downtime.</li>
        <li>If XP slows down, rotate maps (calibration/diminishing returns can vary).</li>
        <li>Focus on consistent mid-range fights—fast eliminations keep momentum high.</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Similar Maps</h2>
      <div className="flex flex-wrap gap-4 mt-3">
        <Link href="/fortnite-gun-game-maps" className="underline text-cyan-300 hover:text-cyan-200">
          Fortnite Gun Game Maps →
        </Link>
        <Link href="/best-fortnite-xp-maps" className="underline text-cyan-300 hover:text-cyan-200">
          Best Fortnite XP Maps →
        </Link>
        <Link href="/tmnt-fortnite-maps" className="underline text-cyan-300 hover:text-cyan-200">
          TMNT Fortnite Maps →
        </Link>
      </div>

      <h2 className="text-2xl text-white mt-12">FAQ</h2>
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Is this a Gun Game map?</h3>
          <p className="mt-2">
            It’s a combat-focused experience with repeatable rounds. Some versions play like a gun
            game/rotation loop—follow the in-map rules for the current build.
          </p>
        </div>
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Does it give XP?</h3>
          <p className="mt-2">
            XP depends on Fortnite calibration and the island’s current settings. XP rates can change
            after updates or revisions.
          </p>
        </div>
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Can I play with friends?</h3>
          <p className="mt-2">Yes—this one is best with squads/parties for faster rounds.</p>
        </div>
      </div>

      <section className="mt-12 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
        <p className="text-white font-semibold">Note</p>
        <p className="mt-2">
          XP availability can change with Fortnite updates and calibration. This page focuses on normal,
          repeatable gameplay loops—not exploits.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/fortnite-gun-game-maps" className="text-sm underline text-gray-400 hover:text-white">
          ← Back to Gun Game Maps
        </Link>
        <Link href="/best-fortnite-xp-maps" className="text-sm underline text-gray-400 hover:text-white">
          ← Back to XP Maps
        </Link>
        <a href="#top" className="text-sm underline text-gray-400 hover:text-white">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
