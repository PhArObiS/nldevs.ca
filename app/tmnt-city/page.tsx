import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://www.nldevs.ca";

const MAP = {
  title: "TMNT City",
  code: "1383-6989-3967",
  image: "/CityTMNT.jpeg",
  url: `${SITE_URL}/tmnt-city`,
};

export const metadata: Metadata = {
  title: `TMNT City Map Code (${MAP.code}) | NLDEVS`,
  description: `Explore TMNT City in Fortnite. Map code ${MAP.code}. A TMNT-themed city experience built with UEFN by NLDEVS.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `TMNT City Map Code (${MAP.code}) | NLDEVS`,
    description: `Explore TMNT City in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Experience",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "TMNT-themed city experience built in UEFN — explore, fight, and chill with friends.",
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-300">
      <Script id="tmnt-city-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* ✅ Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-3 text-sm">
        <Link href="/" className="text-gray-300 underline hover:text-white">
          ← Back to Home
        </Link>

        <span className="text-gray-500">/</span>

        <Link
          href="/tmnt-fortnite-maps"
          className="text-gray-300 underline hover:text-white"
        >
          Back to TMNT Maps
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
        alt={`${MAP.title} Fortnite map screenshot`}
        width={1200}
        height={700}
        className="rounded-lg mt-4"
      />

      <h2 className="text-2xl text-white mt-12">Gameplay Description</h2>
      <p className="mt-3">
        TMNT City is an immersive city-style TMNT experience built in UEFN.
        Explore, fight, and hang out with friends in a themed environment
        designed for repeat visits.
      </p>

      <h2 className="text-2xl text-white mt-12">How to Play</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Enter map code {MAP.code} in Fortnite Discover</li>
        <li>Load in and explore the city</li>
        <li>Follow in-map objectives and activities</li>
        <li>Play with friends for the best vibe</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Why It’s Fun</h2>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Strong TMNT atmosphere</li>
        <li>Exploration + combat loops</li>
        <li>Great “hangout” map for squads</li>
      </ul>

      <h2 className="text-2xl text-white mt-12">Similar Maps</h2>
      <div className="flex flex-wrap gap-4 mt-3">
        <Link
          href="/tmnt-mega-ramp-survival"
          className="underline text-cyan-300 hover:text-cyan-200"
        >
          TMNT Mega Ramp Survival →
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
          <h3 className="font-semibold text-white">Is TMNT City a gun game?</h3>
          <p className="mt-2">
            It’s more of an experience/exploration map with action elements.
          </p>
        </div>

        <div className="rounded-lg border border-[#2A0E61] p-4">
          <h3 className="font-semibold text-white">
            How do I find it in Fortnite?
          </h3>
          <p className="mt-2">Discover → enter {MAP.code}.</p>
        </div>
      </div>
    </main>
  );
}
