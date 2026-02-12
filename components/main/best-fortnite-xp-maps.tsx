import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Fortnite XP Maps (Map Codes)",
  description:
    "Discover the best Fortnite XP maps and map codes to level up efficiently. Curated by NLDevs with quick notes and updated picks.",
  alternates: {
    canonical: "https://www.nldevs.ca/best-fortnite-xp-maps",
  },
};

export default function BestFortniteXpMapsPage() {
  // Basic JSON-LD (we can expand this once you add specific XP maps)
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Fortnite XP Maps",
    description:
      "A curated list of Fortnite XP maps and map codes to help players level up efficiently.",
    url: "https://www.nldevs.ca/best-fortnite-xp-maps",
    isPartOf: {
      "@type": "WebSite",
      name: "NLDevs",
      url: "https://www.nldevs.ca",
    },
  };

  return (
    <main className="px-6 py-12 text-white max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Link href="/" className="text-gray-300 underline">
        ← Back to Favorite Fortnite Maps
      </Link>

      <h1 className="mt-6 text-4xl font-bold">Best Fortnite XP Maps</h1>

      <p className="mt-4 text-gray-300">
        This page will list curated Fortnite XP maps with map codes, what to expect,
        and tips for efficient leveling. (Next step: add your XP map entries.)
      </p>

      {/* Placeholder list for now */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">XP Map Codes</h2>
        <p className="mt-2 text-gray-300">
          Add XP maps here as you collect them. Each entry should include a map name,
          code, and short description.
        </p>

        <div className="mt-6 rounded-lg border border-[#2A0E61] p-5 text-gray-300">
          Coming soon: curated XP maps + codes.
        </div>
      </section>
    </main>
  );
}
