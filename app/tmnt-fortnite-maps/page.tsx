import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.nldevs.ca";

export const metadata: Metadata = {
  title: "Best TMNT Fortnite Maps & Map Codes | NLDevs",
  description:
    "Play the best TMNT Fortnite maps by NLDevs. Includes map codes for TMNT Mega Ramp Survival and TMNT City, built with UEFN.",
  alternates: {
    canonical: `${SITE_URL}/tmnt-fortnite-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tmnt-fortnite-maps`,
    title: "Best TMNT Fortnite Maps & Map Codes | NLDevs",
    description:
      "Browse TMNT Fortnite maps and map codes by NLDevs, including TMNT Mega Ramp Survival and TMNT City.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best TMNT Fortnite Maps & Map Codes | NLDevs",
    description:
      "Browse TMNT Fortnite maps and map codes by NLDevs, including TMNT Mega Ramp Survival and TMNT City.",
  },
};

const tmntMaps = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    href: "/tmnt-mega-ramp-survival",
    description:
      "High-speed Mega Ramp survival chaos with TMNT vibes. Dodge obstacles and survive the run.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    href: "/tmnt-city",
    description:
      "Explore a TMNT-themed city experience built in UEFN. Great for vibe, fights, and roleplay.",
  },
];

export default function TMNTFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best TMNT Fortnite Maps & Map Codes",
    description:
      "A curated collection of Teenage Mutant Ninja Turtles (TMNT) Fortnite maps and map codes by NLDevs.",
    url: `${SITE_URL}/tmnt-fortnite-maps`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDevs",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "TMNT Fortnite Maps",
      numberOfItems: tmntMaps.length,
      itemListElement: tmntMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          description: `${m.description} Map code: ${m.code}.`,
          url: `${SITE_URL}${m.href}`,
          publisher: {
            "@type": "Organization",
            name: "NLDevs",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Link href="/" className="text-gray-300 underline">
        ← Back to Favorite Fortnite Maps
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">Best TMNT Fortnite Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Browse our Teenage Mutant Ninja Turtles (TMNT) themed Fortnite maps built with
          Unreal Editor for Fortnite (UEFN). Each map includes a code and a quick overview.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2" aria-label="TMNT Fortnite maps list">
        {tmntMaps.map((m) => (
          <article key={m.title} className="rounded-lg border border-[#2A0E61] p-6">
            <h2 className="text-2xl font-semibold">{m.title}</h2>
            <p className="mt-2 text-gray-300">{m.description}</p>

            <p className="mt-4 text-gray-300">
              <span className="font-semibold text-white">Map Code:</span>{" "}
              <span className="text-cyan-300">{m.code}</span>
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link href={m.href} className="text-cyan-300 underline hover:text-cyan-200">
                View map details →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
