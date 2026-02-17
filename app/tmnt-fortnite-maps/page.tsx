import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Breadcrumbs from "@/components/main/Breadcrumbs";

const SITE_URL = "https://www.nldevs.ca";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
  description:
    "Browse TMNT Fortnite maps and map codes by NLDEVS, including TMNT Mega Ramp Survival and TMNT City — built with UEFN.",
  alternates: {
    canonical: `${SITE_URL}/tmnt-fortnite-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tmnt-fortnite-maps`,
    title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
    description:
      "TMNT Fortnite maps and map codes by NLDEVS — TMNT Mega Ramp Survival and TMNT City.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best TMNT Fortnite Maps & Map Codes | NLDEVS",
    description:
      "TMNT Fortnite maps and map codes by NLDEVS — TMNT Mega Ramp Survival and TMNT City.",
  },
};

const tmntMaps: {
  title: string;
  code: string;
  image?: string;
  type: "Survival" | "Adventure" | "Gun Game" | "PvP" | "Experience";
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    type: "Survival",
    notes:
      "High-speed Mega Ramp survival with TMNT theme. Dodge chaos and survive the run.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    type: "Experience",
    notes:
      "TMNT-themed city experience built in UEFN — explore, fight, and chill with friends.",
    detailsHref: "/tmnt-city",
  },
];

export default function TMNTFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best TMNT Fortnite Maps & Map Codes",
    description:
      "A curated list of Teenage Mutant Ninja Turtles (TMNT) Fortnite maps and map codes built with UEFN by NLDEVS.",
    url: `${SITE_URL}/tmnt-fortnite-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDEVS",
      url: SITE_URL,
    },
    about: [
      "TMNT Fortnite maps",
      "Teenage Mutant Ninja Turtles Fortnite",
      "Fortnite map codes",
      "UEFN TMNT islands",
      "TMNT Mega Ramp Survival",
      "TMNT City",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "TMNT Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: tmntMaps.length,
      itemListElement: tmntMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: `TMNT Fortnite Map (${m.type})`,
          description: `Fortnite map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/tmnt-fortnite-maps#${m.code.replaceAll("-", "")}`,
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
        name: "Are these TMNT Fortnite maps official?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "These are community-created Fortnite experiences built with UEFN. This page is not affiliated with Nickelodeon or the TMNT brand.",
        },
      },
      {
        "@type": "Question",
        name: "What is TMNT Mega Ramp Survival?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TMNT Mega Ramp Survival is a fast-paced survival experience focused on dodging hazards and staying alive as chaos increases on a mega ramp.",
        },
      },
      {
        "@type": "Question",
        name: "Is TMNT City a gun game map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TMNT City is primarily a TMNT-themed city experience. Depending on the island’s current version, it may include combat areas or game modes, but it’s designed as an overall experience map.",
        },
      },
    ],
  };

  return (
    <main id="top" className="px-6 py-12 text-white max-w-5xl mx-auto">
      <Script id="tmnt-collection-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>
      <Script id="tmnt-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* ✅ Breadcrumbs (consistent) */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "TMNT Maps" },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-4xl font-bold">Best TMNT Fortnite Maps &amp; Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Here are our TMNT-themed Fortnite maps built with Unreal Editor for Fortnite (UEFN).
          Each entry includes a map code, quick description, and gameplay type.
        </p>
        <p className="mt-3 text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
      </header>

      <section id="what-are-tmnt-maps" className="mt-10">
        <h2 className="text-2xl font-semibold">What are TMNT Fortnite maps?</h2>
        <div className="mt-3 text-gray-300 space-y-4">
          <p>
            TMNT Fortnite maps are community-made islands inspired by Teenage Mutant Ninja Turtles
            themes — city exploration, survival runs, combat arenas, and fast-paced mini-games.
            These islands are built with UEFN and are designed for replayability with friends.
          </p>
          <p>
            If you’re looking for high-speed action, survival maps like Mega Ramp modes are great for
            quick sessions. If you want more freedom, city experience maps are ideal for exploring,
            fighting, and hanging out with a party.
          </p>
        </div>
      </section>

      <nav className="mt-8 rounded-lg border border-[#2A0E61] p-4 text-gray-200">
        <p className="font-semibold text-white">On this page</p>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <a className="underline hover:text-white" href="#tmnt-map-codes">
              TMNT Map Codes
            </a>
          </li>
          <li>
            <a className="underline hover:text-white" href="#tips">
              Tips for TMNT maps
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

      <section id="tmnt-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">TMNT Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Use these codes in Fortnite Discover to play our TMNT experiences.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {tmntMaps.map((m) => {
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
                    <span className="font-semibold text-white">Map Code:</span> {m.code}
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
        <h2 className="text-2xl font-semibold">Tips for TMNT Fortnite maps</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>Play with friends — survival runs and city maps are more fun with a party.</li>
          <li>
            Mega Ramp tip: stay centered and make small corrections early instead of big turns late.
          </li>
          <li>Favorite the map after playing so it’s easier to return after updates.</li>
          <li>If you want PvP, head into combat zones or gun game modes when available.</li>
        </ul>
      </section>

      <section id="how-to-play" className="mt-12">
        <h2 className="text-2xl font-semibold">How to play TMNT Fortnite maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter the map code exactly (####-####-####).</li>
          <li>Join the island and follow the in-game objectives.</li>
          <li>Favorite the map to find it faster next time.</li>
        </ol>
      </section>

      <section id="faq" className="mt-12">
        <h2 className="text-2xl font-semibold">FAQ</h2>

        <div className="mt-4 space-y-6 text-gray-300">
          <div>
            <h3 className="text-white font-semibold">How do I enter a Fortnite map code?</h3>
            <p className="mt-2">
              Open Fortnite, go to Search/Discover, enter the island code (####-####-####), then select the result to play.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Are these TMNT Fortnite maps official?</h3>
            <p className="mt-2">
              These are community-created Fortnite experiences built with UEFN. This page is not affiliated with Nickelodeon or the TMNT brand.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">What is TMNT Mega Ramp Survival?</h3>
            <p className="mt-2">
              A fast-paced survival experience focused on dodging hazards and staying alive as chaos increases on a mega ramp.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold">Is TMNT City a gun game map?</h3>
            <p className="mt-2">
              TMNT City is primarily a TMNT-themed city experience. Depending on the island’s current version, it may include combat areas or game modes.
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
