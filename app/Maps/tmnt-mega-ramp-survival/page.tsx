import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/main/Breadcrumbs";

const SITE_URL = "https://www.nldevs.ca";
const MAP = {
  title: "TMNT Mega Ramp Survival",
  code: "0556-7584-6565",
  image: "/MegaRampSurvival.jpeg",
  url: `${SITE_URL}/tmnt-mega-ramp-survival`,
};

export const metadata: Metadata = {
  title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
  description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}. High-speed survival gameplay built with UEFN by NLDEVS.`,
  alternates: { canonical: MAP.url },
  openGraph: {
    type: "website",
    url: MAP.url,
    title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
    description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}.`,
    images: [{ url: `${SITE_URL}${MAP.image}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `TMNT Mega Ramp Survival Map Code (${MAP.code}) | NLDEVS`,
    description: `Play TMNT Mega Ramp Survival in Fortnite. Map code ${MAP.code}.`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: MAP.title,
    gamePlatform: "Fortnite",
    genre: "Survival",
    url: MAP.url,
    image: `${SITE_URL}${MAP.image}`,
    description:
      "High-speed ramp survival Fortnite experience built with UEFN by NLDEVS.",
    publisher: {
      "@type": "Organization",
      name: "NLDEVS",
      url: SITE_URL,
    },
  };

  return (
    <main id="top" className="max-w-5xl mx-auto px-6 py-12 text-gray-300">
      <Script id="tmnt-mega-ramp-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* ✅ Breadcrumbs (consistent) */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "TMNT Maps", href: "/tmnt-fortnite-maps" },
          { label: MAP.title },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-4xl font-bold text-white">{MAP.title}</h1>

        <div className="mt-6 p-6 border border-[#2A0E61] rounded-lg">
          <p className="text-xl">
            <span className="font-semibold text-white">Map Code:</span> {MAP.code}
          </p>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl text-white">Screenshots</h2>
        <Image
          src={MAP.image}
          alt={`${MAP.title} Fortnite gameplay`}
          width={1200}
          height={700}
          className="rounded-lg mt-4"
          priority={false}
        />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-white">Gameplay Description</h2>
        <p className="mt-3">
          TMNT Mega Ramp Survival is a high-speed survival experience where players
          race up a massive ramp while avoiding hazards and surviving as long as possible.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-white">How to Play</h2>
        <ul className="list-disc ml-6 mt-3 space-y-2">
          <li>Open Fortnite → Discover</li>
          <li>Enter map code {MAP.code}</li>
          <li>Join the island and start a run</li>
          <li>Survive longer to improve your score</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-white">Why It’s Fun</h2>
        <ul className="list-disc ml-6 mt-3 space-y-2">
          <li>Quick “one more run” replayability</li>
          <li>High-speed movement + chaos</li>
          <li>Great solo or with friends</li>
          <li>Strong TMNT theme</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-white">Similar Maps</h2>
        <div className="flex flex-wrap gap-4 mt-3">
          <Link href="/tmnt-city" className="underline text-cyan-300 hover:text-cyan-200">
            TMNT City →
          </Link>
          <Link href="/rvb-squid-minigame" className="underline text-cyan-300 hover:text-cyan-200">
            RvB Squid Minigame →
          </Link>
          <Link href="/best-fortnite-xp-maps" className="underline text-cyan-300 hover:text-cyan-200">
            Best Fortnite XP Maps →
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl text-white">FAQ</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">How do I play this map?</h3>
            <p className="mt-2">Enter the code {MAP.code} in Fortnite Discover.</p>
          </div>
          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">Is it multiplayer?</h3>
            <p className="mt-2">Yes — it’s fun solo or with a party.</p>
          </div>
        </div>
      </section>

      <div className="mt-12">
        <a href="#top" className="text-sm underline text-gray-400 hover:text-white">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
