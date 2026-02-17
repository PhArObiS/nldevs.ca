import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

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
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDEVS",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDEVS.",
  },
};

const xpMaps: {
  title: string;
  code: string;
  image?: string;
  type: "AFK" | "Active" | "Mixed";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Active",
    notes:
      "Fast-paced survival runs with repeatable gameplay loops. Great if you prefer active play while leveling. XP can vary by update/calibration.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    type: "Mixed",
    notes:
      "Combat-focused loops with repeatable rounds. Works well for players who want XP while fighting instead of pure AFK.",
    detailsHref: "/winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    type: "Mixed",
    notes:
      "Team-based objectives and longer sessions. Good if you want steady XP while playing PvP-style rounds and rotating fights.",
    // detailsHref: "/rvb-players-vs-guards",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Active",
    notes:
      "Exploration + combat routes. Best for players who like moving through the map, finding loops, and staying active for consistent XP.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "Active",
    notes:
      "Fast rounds and objective-based play. If you keep playing the minigames (instead of idling), you can stack steady match XP.",
    detailsHref: "/rvb-squid-minigame",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Mixed",
    notes:
      "Battle royale vs bots with repeatable matches. Good for warmups and steady playtime loops; XP changes depending on calibration.",
    detailsHref: "/tilted-squid-royale-99-bots",
  },
];

export default function BestFortniteXpMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite XP Maps & Map Codes",
    description:
      "A curated list of Fortnite XP maps and map codes to help players level up efficiently.",
    url: `${SITE_URL}/best-fortnite-xp-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDEVS",
      url: SITE_URL,
    },
    about: [
      "best fortnite xp maps",
      "fortnite xp map codes",
      "afk xp maps",
      "active xp maps",
      "fortnite map codes",
      "level up fast",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "Fortnite XP Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: xpMaps.length,
      itemListElement: xpMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `XP Map (${m.type})`,
          description: `Fortnite XP map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/best-fortnite-xp-maps#${m.code.replaceAll("-", "")}`,
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
        name: "How do I enter a Fortnite XP map code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open Fortnite → Search/Discover → enter the code (####-####-####) → select the island and play.",
        },
      },
      {
        "@type": "Question",
        name: "Do Fortnite XP maps still work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some XP maps work depending on Fortnite calibration and map updates. XP rates can change after patches, revisions, or recalibration.",
        },
      },
      {
        "@type": "Question",
        name: "Why did my XP slow down or stop in an XP map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "XP can change due to calibration, daily XP limits, or island updates. Rotate maps, switch to active objectives, and avoid repeating the exact same loop nonstop.",
        },
      },
      {
        "@type": "Question",
        name: "Are XP maps safe or allowed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This page focuses on normal gameplay loops and legitimate leveling. Avoid exploit/hack methods; XP availability can change with Fortnite rules and calibration.",
        },
      },
    ],
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      {/* ✅ JSON-LD */}
      <Script id="xp-collection-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>
      <Script id="xp-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* ✅ Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="text-sm flex flex-wrap gap-2 text-gray-300"
      >
        <Link href="/" className="underline hover:text-white">
          Home
        </Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-200">XP Maps</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">
          Best Fortnite XP Maps &amp; Map Codes
        </h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking to level up fast? Here are curated Fortnite XP maps with map
          codes and quick notes. We focus on efficient, repeatable XP routes so
          you can pick a map that matches your playstyle.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <section id="what-are-xp-maps" className="mt-10">
        <h2 className="text-2xl font-semibold">What are Fortnite XP maps?</h2>
        <div className="mt-3 text-gray-300 space-y-4">
          <p>
            Fortnite XP maps are community-made islands designed around
            repeatable gameplay loops that may award XP depending on calibration
            and updates. Some are active (you’re always moving), some are mixed,
            and some are AFK-ish depending on the island’s current version.
          </p>
          <p>
            XP rates can change after Fortnite patches or island revisions, so
            it’s smart to rotate a few maps and mix active objectives with
            normal play.
          </p>
        </div>
      </section>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#xp-map-codes">
              XP Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#how-to-use-xp-maps">
              How to use XP maps
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#tips">
              Tips to maximize XP
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

      <section id="xp-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">XP Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Each entry includes a map code, type (AFK / Active / Mixed), and a
          quick note. Some entries link to full detail pages.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {xpMaps.map((m) => {
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

      <section id="how-to-use-xp-maps" className="mt-12">
        <h2 className="text-2xl font-semibold">How to use Fortnite XP maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the map code exactly as shown (####-####-####).</li>
          <li>Join the map and follow in-map objectives.</li>
          <li>Rotate maps if XP slows down.</li>
        </ol>
      </section>

      <section id="tips" className="mt-12">
        <h2 className="text-2xl font-semibold">Tips to maximize XP</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>Rotate 2–4 maps to reduce diminishing returns.</li>
          <li>Prefer Active/Mixed maps for steady playtime loops.</li>
          <li>Favorite maps you enjoy so you can return quickly after updates.</li>
          <li>If XP feels “dry,” switch islands instead of forcing it.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">
              How do I enter a Fortnite XP map code?
            </h3>
            <p className="mt-2">
              Open Fortnite → Search/Discover → enter the code → select the
              island.
            </p>
          </div>

          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">
              Do Fortnite XP maps still work?
            </h3>
            <p className="mt-2">
              Some do, depending on calibration and updates. XP rates can change
              after patches or revisions.
            </p>
          </div>

          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">
              Why did my XP slow down or stop?
            </h3>
            <p className="mt-2">
              Calibration changes, daily limits, or island revisions can affect
              XP. Rotate maps and switch to active objectives.
            </p>
          </div>

          <div className="rounded-lg border border-[#2A0E61] p-4">
            <h3 className="font-semibold text-white">Are XP maps allowed?</h3>
            <p className="mt-2">
              We focus on normal gameplay loops and legitimate leveling. Avoid
              exploit/hack methods.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
        <p className="text-white font-semibold">Note</p>
        <p className="mt-2">
          XP availability can change with Fortnite updates and calibration. This
          page focuses on normal, repeatable gameplay loops—not exploits.
        </p>
      </section>

      <section id="related" className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
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
          <li>
            <Link href="/squid-game-fortnite-maps" className="underline hover:text-white">
              Best Squid Game Fortnite Maps
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-12">
        <a href="#top" className="text-sm underline text-gray-400 hover:text-white">
          Back to top ↑
        </a>
      </div>
    </main>
  );
}
