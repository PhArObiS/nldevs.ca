import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://www.nldevs.ca";
const MAP = {
  title: "Tilted Squid Royale (99 Bots)",
  code: "1116-7765-9076",
  image: "/TiltedSquidRoyale99Bots.jpeg",
  url: `${SITE_URL}/tilted-squid-royale-99-bots`,
};

export const metadata: Metadata = {
  title: `${MAP.title} Map Code (${MAP.code}) | NLDEVS`,
  description: `Play ${MAP.title} in Fortnite. Map code ${MAP.code}. Squid-inspired Tilted battle royale with bots — great for practice and quick wins.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `${MAP.title} Map Code (${MAP.code}) | NLDEVS`,
    description: `Play ${MAP.title} in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Battle Royale / Bots",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "Squid-inspired Tilted battle royale with bots — great for practice, quick wins, and replayable rounds.",
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-300">
      <Script id="tilted-squid-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-3 text-sm">
        <Link href="/" className="text-gray-300 underline hover:text-white">
          ← Back to Home
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          href="/squid-game-fortnite-maps"
          className="text-gray-300 underline hover:text-white"
        >
          ← Back to Squid Game Maps
        </Link>
      </nav>

      <h1 className="text-4xl font-bold text-white">{MAP.title}</h1>

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
      />

      <h2 className="text-2xl text-white mt-12">Gameplay Description</h2>
      <p className="mt-3">
        Tilted Squid Royale (99 Bots) is a Squid-inspired battle royale set around a Tilted-style
        environment, designed for fast matches and consistent action. The bot-filled lobby makes it
        great for warming up aim, learning routes, and getting quick wins.
      </p>

      <h2 className="text-2xl text-white mt-12">How to Play</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Open Fortnite → Discover</li>
        <li>Enter map code {MAP.code}</li>
        <li>Drop in, loot fast, and rotate early</li>
        <li>Use the bots to practice fights and positioning</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Why It’s Fun</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Great practice environment (bots + quick fights)</li>
        <li>Fast “one more match” pacing</li>
        <li>Good for squads or solo warmups</li>
        <li>Tilted-style nostalgia with a Squid vibe</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Similar Maps</h2>
      <div className="flex flex-wrap gap-4 mt-3">
        <Link
          href="/rvb-squid-minigame"
          className="underline text-cyan-300 hover:text-cyan-200"
        >
          RvB Squid Minigame →
        </Link>
        <Link
          href="/squid-game-fortnite-maps"
          className="underline text-cyan-300 hover:text-cyan-200"
        >
          Squid Game Maps →
        </Link>
        <Link
          href="/fortnite-gun-game-maps"
          className="underline text-cyan-300 hover:text-cyan-200"
        >
          Fortnite Gun Game Maps →
        </Link>
      </div>

      <h2 className="text-2xl text-white mt-12">FAQ</h2>
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Is this a real Squid Game map?</h3>
          <p className="mt-2">
            It’s Squid-style inspired (elimination / high-stakes vibe), not official Netflix content.
          </p>
        </div>
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Why bots?</h3>
          <p className="mt-2">
            Bots make it ideal for practice, warmups, and quick matches without long queues.
          </p>
        </div>
      </div>

      {/* Optional note (legal clarity) */}
      <section className="mt-12 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
        <p className="text-white font-semibold">Note</p>
        <p className="mt-2">
          “Squid” is used here to describe gameplay style and inspiration. This page is not affiliated
          with Netflix or the Squid Game brand.
        </p>
      </section>
    </main>
  );
}
