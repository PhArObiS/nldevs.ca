import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite Gun Game Maps & Map Codes | NLDEVS",
    description:
      "Fortnite Gun Game maps and map codes curated by NLDEVS — weapon progression PvP maps built for replayability.",
  },
};

const gunGameMaps: {
  title: string;
  code: string;
  image?: string;
  mode: "Gun Game" | "Team Gun Game" | "FFA Gun Game";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "TMNT City — Gun Game",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    mode: "Gun Game",
    notes: "TMNT-themed combat loops with fast weapon progression and replayable rounds.",
    // detailsHref: "/tmnt-city",
  },
  {
    title: "Winterfest Demon Hunters — Gun Game",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "FFA Gun Game",
    notes: "Holiday demon-hunting gun game with repeatable combat loops and weapon rotations.",
  },
];

export default function FortniteGunGameMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite Gun Game Maps & Map Codes",
    description:
      "A curated list of Fortnite Gun Game maps and map codes. Fast-paced weapon progression PvP maps curated by NLDEVS.",
    url: `${SITE_URL}/fortnite-gun-game-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDEVS",
      url: SITE_URL,
    },
    about: [
      "Fortnite Gun Game maps",
      "Fortnite map codes",
      "Weapon progression PvP",
      "Free-for-all Gun Game",
      "Team Gun Game",
      "Gun Game arenas",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "Fortnite Gun Game Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: gunGameMaps.length,
      itemListElement: gunGameMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `Gun Game (${m.mode})`,
          description: `Fortnite Gun Game map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/fortnite-gun-game-maps#${m.code.replaceAll("-", "")}`,
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
        name: "What is a Fortnite Gun Game map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gun Game is a weapon progression mode. You start with a weapon and each elimination upgrades you to the next weapon. The first player (or team) to finish the weapon list wins.",
        },
      },
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
        name: "What is the difference between FFA and Team Gun Game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FFA (free-for-all) is everyone vs everyone. Team Gun Game groups players into teams and team eliminations may contribute to weapon progression depending on the map rules.",
        },
      },
      {
        "@type": "Question",
        name: "Do Gun Game maps give XP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some islands may grant XP depending on Fortnite calibration and map settings. XP rates can change after updates or revisions.",
        },
      },
    ],
  };

  return (
    <main className="px-6 py-12 text-white max-w-5xl mx-auto">
      {/* JSON-LD: CollectionPage + FAQPage */}
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
        <h1 className="text-4xl font-bold">Best Fortnite Gun Game Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Gun Game maps are fast-paced weapon progression modes where eliminations upgrade your
          loadout. Here are curated Gun Game islands with map codes, images, and quick notes.
        </p>
        <p className="mt-3 text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
      </header>

      {/* What is it? (SEO + intent match) */}
      <section id="what-is-gun-game" className="mt-10">
        <h2 className="text-2xl font-semibold">What is a Fortnite Gun Game map?</h2>
        <div className="mt-3 text-gray-300 space-y-4">
          <p>
            Fortnite Gun Game is a weapon progression mode built for quick, replayable PvP rounds.
            Players start with a weapon and gain an upgrade after each elimination. The goal is to
            climb the weapon list faster than everyone else.
          </p>
          <p>
            You’ll commonly see free-for-all (FFA) Gun Game, team variants, and themed arenas. The
            best Gun Game maps have tight spawns, clear sightlines, and balanced weapon rotations so
            every match stays competitive.
          </p>
        </div>
      </section>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#gun-game-map-codes">
              Gun Game Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#tips">
              Tips for Gun Game
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#how-to-play-gun-game">
              How to play Gun Game
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

      <section id="gun-game-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">Gun Game Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Each entry includes a map code, the Gun Game style, and a quick description.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gunGameMaps.map((m) => (
            <article
              key={m.code}
              id={m.code.replaceAll("-", "")}
              className="rounded-lg border border-[#2A0E61] overflow-hidden"
            >
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
                  <span className="font-semibold text-white">Map Code:</span> {m.code}
                </p>

                <p className="mt-1 text-gray-400 text-sm">Mode: {m.mode}</p>

                <p className="mt-3 text-gray-300">{m.notes}</p>

                {m.detailsHref ? (
                  <Link
                    href={m.detailsHref}
                    className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200"
                  >
                    View details →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tips (SEO + engagement) */}
      <section id="tips" className="mt-12">
        <h2 className="text-2xl font-semibold">Tips to win Gun Game rounds</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            Play corners and reset fights: Gun Game rewards smart re-peeks more than nonstop
            sprinting.
          </li>
          <li>
            Learn spawn flow: once you know where players reappear, you can chain eliminations and
            climb faster.
          </li>
          <li>
            Prioritize mid-range consistency: most weapon lists punish missed shots more than “big”
            plays.
          </li>
          <li>
            In FFA, avoid long chases—rotate to the next fight to keep your upgrades rolling.
          </li>
        </ul>
      </section>

      <section id="how-to-play-gun-game" className="mt-12">
        <h2 className="text-2xl font-semibold">How to play Fortnite Gun Game maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the map code (####-####-####).</li>
          <li>Get eliminations to upgrade weapons.</li>
          <li>First player to finish the weapon list wins (rules vary by map).</li>
        </ol>
      </section>

      {/* FAQ (content + schema already included above) */}
      <section id="faq" className="mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>

        <div className="mt-4 space-y-6 text-gray-300">
          <div>
            <h3 className="text-white font-semibold">What is a Fortnite Gun Game map?</h3>
            <p className="mt-2">
              Gun Game is a weapon progression mode. You start with a weapon and each elimination
              upgrades you to the next weapon. The first player (or team) to finish the weapon list
              wins.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">How do I enter a Fortnite map code?</h3>
            <p className="mt-2">
              Open Fortnite, go to Search/Discover, enter the island code (####-####-####), then
              select the result to play.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              What is the difference between FFA and Team Gun Game?
            </h3>
            <p className="mt-2">
              FFA (free-for-all) is everyone vs everyone. Team Gun Game groups players into teams
              and team eliminations may contribute to weapon progression depending on the map rules.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">Do Gun Game maps give XP?</h3>
            <p className="mt-2">
              Some islands may grant XP depending on Fortnite calibration and map settings. XP rates
              can change after updates or revisions.
            </p>
          </div>
        </div>
      </section>

      {/* Related internal links (crawl paths) */}
      <section id="related" className="mt-12">
        <h2 className="text-2xl font-semibold">Related pages</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>
            <Link href="/best-fortnite-xp-maps" className="underline hover:text-white">
              Best Fortnite XP Maps
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
