import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.nldevs.ca";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Fortnite XP Maps & Map Codes (Level Up Fast)",
  description:
    "Best Fortnite XP maps and map codes to help you level up efficiently. Curated by NLDevs with quick summaries and updated picks.",
  alternates: {
    canonical: `${SITE_URL}/best-fortnite-xp-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/best-fortnite-xp-maps`,
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast)",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast)",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs.",
  },
};

const xpMaps: {
  title: string;
  code: string;
  image?: string;
  type: "AFK" | "Active" | "Mixed";
  notes: string;
}[] = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Active",
    notes:
      "Fast-paced survival runs with repeatable gameplay loops. Great if you prefer active play while leveling. XP can vary by update/calibration.",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    type: "Mixed",
    notes:
      "Combat-focused loops with repeatable rounds. Works well for players who want XP while fighting instead of pure AFK.",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    type: "Mixed",
    notes:
      "Team-based objectives and longer sessions. Good if you want steady XP while playing PvP-style rounds and rotating fights.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Active",
    notes:
      "Exploration + combat routes. Best for players who like moving through the map, finding loops, and staying active for consistent XP.",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    type: "Active",
    notes:
      "Fast rounds and objective-based play. If you keep playing the minigames (instead of idling), you can stack steady match XP.",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    type: "Mixed",
    notes:
      "Battle royale vs bots with repeatable matches. Good for warmups and steady playtime loops; XP changes depending on calibration.",
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
      name: "NLDevs",
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
            name: "NLDevs",
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
        name: "Why did my XP stop in an XP map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "XP can slow down or stop due to calibration changes, daily XP limits, or map updates. Try rotating maps or switching to active objectives.",
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
    <main className="px-6 py-12 text-white max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link href="/" className="text-gray-300 underline">
        ← Back to Favorite Fortnite Maps
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">Best Fortnite XP Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking to level up fast? Here are curated Fortnite XP maps with map codes and quick notes.
          We focus on efficient, repeatable XP routes so you can pick a map that matches your playstyle.
        </p>
        <p className="mt-3 text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
      </header>

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
            <a className="underline hover:text-white" href="#faq">
              FAQ
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#disclaimer">
              Notes & disclaimer
            </a>
          </li>
        </ul>
      </nav>

      <section id="xp-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">XP Map Codes</h2>
        <p className="mt-2 text-gray-300">
          We’ll keep this list updated. Each entry includes a map code and whether it’s mostly AFK,
          Active, or Mixed.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {xpMaps.map((m) => (
            <article
              key={m.code}
              id={m.code.replaceAll("-", "")}
              className="rounded-lg border border-[#2A0E61] overflow-hidden"
            >
              {m.image ? (
                <div className="relative w-full h-48">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <h3 className="text-xl font-semibold">{m.title}</h3>

                <p className="mt-2 text-gray-300">
                  <span className="font-semibold text-white">Map Code:</span> {m.code}
                </p>

                <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>

                <p className="mt-3 text-gray-300">{m.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-to-use-xp-maps" className="mt-12">
        <h2 className="text-2xl font-semibold">How to use Fortnite XP maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>In Fortnite, go to Search / Discover.</li>
          <li>Enter the map code exactly as shown (####-####-####).</li>
          <li>Join the map and follow the in-map instructions for XP routes.</li>
          <li>For best results, rotate maps and avoid repeating the same route nonstop.</li>
        </ol>
      </section>

      <section id="faq" className="mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>

        <div className="mt-4 space-y-6 text-gray-300">
          <div>
            <h3 className="text-white font-semibold">How do I enter a Fortnite XP map code?</h3>
            <p className="mt-2">Open Fortnite → Search/Discover → enter the code → select the island.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Do Fortnite XP maps still work?</h3>
            <p className="mt-2">
              Some do, depending on Fortnite calibration and map updates. XP rates can change after patches.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Why did my XP stop?</h3>
            <p className="mt-2">
              Calibration changes, daily XP limits, or map revisions can affect XP. Rotate maps or switch to active objectives.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Are XP maps allowed?</h3>
            <p className="mt-2">
              We focus on normal gameplay loops and legitimate leveling. Avoid exploit/hack methods.
            </p>
          </div>
        </div>
      </section>

      <section id="disclaimer" className="mt-12">
        <h2 className="text-2xl font-semibold">Notes & disclaimer</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>XP rates can change with Fortnite updates and map revisions.</li>
          <li>We avoid exploit/hack language and focus on efficient, legitimate leveling.</li>
          <li>If a map stops awarding XP, it may be updated, calibrated, or temporarily limited.</li>
        </ul>
      </section>

      <section className="mt-12">
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
    </main>
  );
}
