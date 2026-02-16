import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://www.nldevs.ca";
const MAP = {
  title: "RvB Squid Minigame",
  code: "2720-5344-3341",
  image: "/RedVsBlueSquidMinigame.jpg",
  url: `${SITE_URL}/rvb-squid-minigame`,
};

export const metadata: Metadata = {
  title: `RvB Squid Minigame Map Code (${MAP.code}) | NLDEVS`,
  description: `Play RvB Squid Minigame in Fortnite. Map code ${MAP.code}. Fast rounds, team chaos, and replayable minigames.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `RvB Squid Minigame Map Code (${MAP.code}) | NLDEVS`,
    description: `Play RvB Squid Minigame in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Red vs Blue / Minigames",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "Squid-style minigames with Red vs Blue chaos and fast rounds.",
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-300">
      <Script id="rvb-squid-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
        RvB Squid Minigame is a fast-paced Red vs Blue experience inspired by Squid-style
        challenges. It’s built for quick rounds, constant action, and “run it back” replayability.
      </p>

      <h2 className="text-2xl text-white mt-12">How to Play</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Enter map code {MAP.code} in Discover</li>
        <li>Join a team</li>
        <li>Play through fast minigame rounds</li>
        <li>Win rounds with teamwork + eliminations</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Why It’s Fun</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Short rounds = high replay value</li>
        <li>Red vs Blue chaos with friends</li>
        <li>Competitive and easy to understand</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Similar Maps</h2>
      <div className="flex flex-wrap gap-4 mt-3">
        <Link href="/fortnite-gun-game-maps" className="underline text-cyan-300 hover:text-cyan-200">
          Fortnite Gun Game Maps →
        </Link>
        <Link href="/squid-game-fortnite-maps" className="underline text-cyan-300 hover:text-cyan-200">
          Squid Game Maps →
        </Link>
      </div>

      <h2 className="text-2xl text-white mt-12">FAQ</h2>
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Is this a Squid Game map?</h3>
          <p className="mt-2">It’s Squid-style inspired minigames with a Red vs Blue format.</p>
        </div>
        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">Can I play with friends?</h3>
          <p className="mt-2">Yes — it’s best with squads/parties.</p>
        </div>
      </div>
    </main>
  );
}
