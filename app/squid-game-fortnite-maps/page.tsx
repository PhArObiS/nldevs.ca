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
    detailsHref: "/tilted-squid-royale-99-bots",
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
      name: "NLDEVS",
      url: SITE_URL,
    },
    about: [
      "Squid Game Fortnite maps",
      "Fortnite map codes",
      "Red Light Green Light style minigames",
      "Elimination challenges",
    ],
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
            name: "NLDEVS",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I enter a Fortnite map code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open Fortnite, go to Search/Discover, enter the island code (####-####-####), then select the result to play.",
        },
      },
      {
        "@type": "Question",
        name: "Are Squid Game Fortnite maps official?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. These are community-created Fortnite experiences inspired by Squid Game-style minigames and challenges, not official Netflix content.",
        },
      },
      {
        "@type": "Question",
        name: "Do Squid Game maps give XP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some islands may grant XP depending on Fortnite calibration and map settings. XP rates can change after updates or revisions.",
        },
      },
      {
        "@type": "Question",
        name: "What Squid Game maps are best to play with friends?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Minigame and elimination-style Squid maps are usually best with a full party. They’re more fun when you can run rounds quickly and compete with friends.",
        },
      },
    ],
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      {/* ✅ JSON-LD (next/script with required id) */}
      <Script id="squid-collection-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>
      <Script id="squid-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm flex flex-wrap gap-2 text-gray-300">
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
          Squid-inspired maps with map codes, images, and quick notes. We focus
          on fun minigames, challenges, and replayable rounds.
        </p>
        <p className="mt-3 text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
      </header>

      <section id="what-are-squid-maps" className="mt-10">
        <h2 className="text-2xl font-semibold">What are Squid Game Fortnite maps?</h2>
        <div className="mt-3 text-gray-300 space-y-4">
          <p>
            “Squid Game” Fortnite maps are community-made islands inspired by
            elimination-style minigames. You’ll usually see fast rounds,
            high-stakes challenges, and chaotic competition — often designed for
            playing with friends.
          </p>
          <p>
            Popular Squid-style modes include Red Light Green Light, survival
            rounds, objective minigames, and battle royale variants. Map
            availability and XP can change over time depending on updates and
            island revisions.
          </p>
        </div>
      </section>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#squid-map-codes">
              Squid Game Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#tips">
              Tips for Squid maps
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#how-to-play">
              How to play
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#related">
              Related pages
            </a>
          </li>
        </ul>
      </nav>

      <section id="squid-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Squid Game Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Enter these codes in Fortnite Discover to play. Each entry includes a
          gameplay type and a quick description.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {squidMaps.map((m) => {
            const CardInner = (
              <>
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
                    <span className="font-semibold text-white">Map Code:</span>{" "}
                    {m.code}
                  </p>

                  <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>

                  <p className="mt-3 text-gray-300">{m.notes}</p>

                  {m.detailsHref ? (
                    <span className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200">
                      View details →
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <article
                key={m.code}
                id={m.code.replaceAll("-", "")}
                className="rounded-lg border border-[#2A0E61] overflow-hidden hover:border-cyan-400 transition"
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

      <section id="tips" className="mt-12">
        <h2 className="text-2xl font-semibold">Tips for Squid Game Fortnite maps</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            Play with friends: most Squid-style rounds are more fun with a full
            party and faster re-queues.
          </li>
          <li>
            If you want practice, pick bot-based variants to learn routes and
            mechanics before jumping into PvP rounds.
          </li>
          <li>
            Rotate maps if XP slows down; calibration and diminishing returns
            can vary by island and update cycle.
          </li>
          <li>
            Use voice chat or quick pings — coordination matters in elimination
            challenges and team rounds.
          </li>
        </ul>
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

      <section id="faq" className="mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>

        <div className="mt-4 space-y-6 text-gray-300">
          <div>
            <h3 className="text-white font-semibold">How do I enter a Fortnite map code?</h3>
            <p className="mt-2">
              Open Fortnite, go to Search/Discover, enter the island code
              (####-####-####), then select the result to play.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">Are Squid Game Fortnite maps official?</h3>
            <p className="mt-2">
              No. These are community-created experiences inspired by Squid-style
              minigames and challenges, not official Netflix content.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">Do Squid Game maps give XP?</h3>
            <p className="mt-2">
              Some islands may grant XP depending on Fortnite calibration and map
              settings. XP rates can change after updates or revisions.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              What Squid Game maps are best to play with friends?
            </h3>
            <p className="mt-2">
              Minigame and elimination-style Squid maps are usually best with a
              full party. They’re more fun when you can run rounds quickly and
              compete with friends.
            </p>
          </div>
        </div>
      </section>

      <section id="related" className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            <Link href="/best-fortnite-xp-maps" className="underline hover:text-white">
              Best Fortnite XP Maps
            </Link>
          </li>
          <li>
            <Link href="/fortnite-gun-game-maps" className="underline hover:text-white">
              Best Fortnite Gun Game Maps
            </Link>
          </li>
          <li>
            <Link href="/tmnt-fortnite-maps" className="underline hover:text-white">
              Best TMNT Fortnite Maps
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
        <p className="text-white font-semibold">Note</p>
        <p className="mt-2">
          “Squid Game” is used here to describe gameplay style and inspiration.
          This page is not affiliated with Netflix or the Squid Game brand.
        </p>
      </section>

      {/* Optional UX: Back to top */}
      <div className="mt-12">
        <a href="#top" className="text-sm underline text-gray-400 hover:text-white">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
