
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.nldevs.ca";

export const metadata: Metadata = {
  title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDevs",
  description:
    "Best Fortnite XP maps and map codes to help you level up efficiently. Curated by NLDevs with quick summaries and updated picks.",
  alternates: {
    canonical: `${SITE_URL}/best-fortnite-xp-maps`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/best-fortnite-xp-maps`,
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDevs",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Fortnite XP Maps & Map Codes (Level Up Fast) | NLDevs",
    description:
      "Browse Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs.",
  },
};

// ✅ Start with an empty list if you don't have XP maps yet.
// Add entries later without changing page structure.
const xpMaps: {
  title: string;
  code: string;
  type: "AFK" | "Active" | "Mixed";
  notes: string;
}[] = [
  // Example (remove if you want):
  // { title: "Example XP Map", code: "1234-5678-9012", type: "Active", notes: "Fast rounds and consistent XP." },
];

export default function BestFortniteXpMapsPage() {
  // ✅ Page-level schema
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
    <main className="px-6 py-12 text-white max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Link href="/" className="text-gray-300 underline">
        ← Back to Favorite Fortnite Maps
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold">Best Fortnite XP Maps & Map Codes</h1>
        <p className="mt-4 text-gray-300 max-w-3xl">
          Looking to level up fast? Here are curated Fortnite XP maps with map codes and
          quick notes. We focus on efficient, repeatable XP routes and clear descriptions
          so you can pick a map that matches your playstyle.
        </p>
      </header>

      {/* Quick navigation */}
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
            <a className="underline hover:text-white" href="#disclaimer">
              Notes & disclaimer
            </a>
          </li>
        </ul>
      </nav>

      {/* XP Map list */}
      <section id="xp-map-codes" className="mt-10">
        <h2 className="text-2xl font-semibold">XP Map Codes</h2>
        <p className="mt-2 text-gray-300">
          We’ll keep this list updated. Each entry includes a map code and whether it’s
          mostly AFK, Active, or Mixed.
        </p>

        {xpMaps.length === 0 ? (
          <div className="mt-6 rounded-lg border border-[#2A0E61] p-6 text-gray-300">
            <p className="text-white font-semibold">No XP maps listed yet.</p>
            <p className="mt-2">
              Add entries to the <code className="text-gray-200">xpMaps</code> array in{" "}
              <code className="text-gray-200">
                app/best-fortnite-xp-maps/page.tsx
              </code>{" "}
              and they’ll automatically appear here (and in schema).
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {xpMaps.map((m) => (
              <article
                key={m.code}
                id={m.code.replaceAll("-", "")}
                className="rounded-lg border border-[#2A0E61] p-5"
              >
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 text-gray-300">
                  <span className="font-semibold text-white">Map Code:</span> {m.code}
                </p>
                <p className="mt-1 text-gray-400 text-sm">Type: {m.type}</p>
                <p className="mt-3 text-gray-300">{m.notes}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* How-to section (SEO + usefulness) */}
      <section id="how-to-use-xp-maps" className="mt-12">
        <h2 className="text-2xl font-semibold">How to use Fortnite XP maps</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-300 space-y-2">
          <li>In Fortnite, go to Search / Discover.</li>
          <li>Enter the map code exactly as shown (####-####-####).</li>
          <li>Join the map and follow the in-map instructions for XP routes.</li>
          <li>For best results, rotate maps and avoid repeating the same route nonstop.</li>
        </ol>
      </section>

      {/* Disclaimer (safe wording) */}
      <section id="disclaimer" className="mt-12">
        <h2 className="text-2xl font-semibold">Notes & disclaimer</h2>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          <li>XP rates can change with Fortnite updates and map revisions.</li>
          <li>We avoid exploit/hack language and focus on efficient, legitimate leveling.</li>
          <li>If a map stops awarding XP, it may be updated, calibrated, or temporarily limited.</li>
        </ul>
      </section>
    </main>
  );
}


// import type { Metadata } from "next";
// import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Best Fortnite XP Maps (Map Codes)",
//   description:
//     "Discover the best Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs with quick notes and updated picks.",
//   alternates: {
//     canonical: "https://www.nldevs.ca/best-fortnite-xp-maps",
//   },
// };

// export default function BestFortniteXpMapsPage() {
//   // Basic JSON-LD (we can expand this once you add specific XP maps)
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "Best Fortnite XP Maps",
//     description:
//       "A curated list of Fortnite XP maps and map codes to help players level up efficiently.",
//     url: "https://www.nldevs.ca/best-fortnite-xp-maps",
//     isPartOf: {
//       "@type": "WebSite",
//       name: "NLDevs",
//       url: "https://www.nldevs.ca",
//     },
//   };

//   return (
//     <main className="px-6 py-12 text-white max-w-5xl mx-auto">
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//       />

//       <Link href="/" className="text-gray-300 underline">
//         ← Back to Favorite Fortnite Maps
//       </Link>

//       <h1 className="mt-6 text-4xl font-bold">Best Fortnite XP Maps</h1>

//       <p className="mt-4 text-gray-300">
//         This page will list curated Fortnite XP maps with map codes, what to expect,
//         and tips for efficient leveling. (Next step: add your XP map entries.)
//       </p>

//       {/* Placeholder list for now */}
//       <section className="mt-10">
//         <h2 className="text-2xl font-semibold">XP Map Codes</h2>
//         <p className="mt-2 text-gray-300">
//           Add XP maps here as you collect them. Each entry should include a map name,
//           code, and short description.
//         </p>

//         <div className="mt-6 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
//           Coming soon: curated XP maps + codes.
//         </div>
//       </section>
//     </main>
//   );
// }
