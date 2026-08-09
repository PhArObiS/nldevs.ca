import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL } from "@/constants/site";

const PAGE_PATH = "/squid-game-fortnite-maps";
const LAST_UPDATED = "February 2026";

export const metadata: Metadata = {
  title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
  description:
    "Browse Squid Game-style Fortnite maps and map codes by NLDEVS, including 99 Bots Squid Royale Boss, Sidekick Siege 99 Bots, and RvB Squid Minigame.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
    description:
      "Squid Game-style Fortnite maps and map codes by NLDEVS, including 99 bots survival, boss battles, sidekicks, and Red vs Blue chaos.",
    images: [{ url: `${SITE_URL}/RedVsBlueSquidMinigame.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Squid Game Fortnite Maps & Map Codes | NLDEVS",
    description:
      "Squid Game-style Fortnite maps and map codes by NLDEVS, including 99 bots survival, boss battles, sidekicks, and Red vs Blue chaos.",
    images: [`${SITE_URL}/RedVsBlueSquidMinigame.jpg`],
  },
};

const squidMaps: {
  title: string;
  code: string;
  image: string;
  type: "Minigame" | "RvB" | "Challenge" | "99 Bots" | "Sidekicks";
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
    title: "99 Bots Squid Royale Boss",
    code: "0596-3765-4845",
    image: "/99 Bots Squid Royale Boss.jpg",
    type: "99 Bots",
    notes:
      "Open-world PvE 99 bots survival with boss battles, new weapons, wildlife riding, ranks, leaderboards, and saved stats.",
    detailsHref: "/99-bots-squid-royale-boss",
  },
  {
    title: "Sidekick Siege 99 Bots",
    code: "5577-7953-8449",
    image: "/Squid99BotsSidekicks.jpg",
    type: "Sidekicks",
    notes:
      "Sidekick-focused 99 bots survival with boss battles, PvE action, saved loadouts, ranks, leaderboards, and up to 5 players.",
    detailsHref: "/sidekick-siege-99-bots",
  },
];

const faqs = [
  {
    q: "How do I enter a Fortnite map code?",
    a: "Open Fortnite, go to Search/Discover, enter the island code (####-####-####), then select the result to play.",
  },
  {
    q: "Are Squid Game Fortnite maps official?",
    a: "No. These are community-created Fortnite experiences inspired by Squid Game-style minigames and challenges, not official Netflix content.",
  },
  {
    q: "Do Squid Game maps give XP?",
    a: "Some islands may grant XP depending on Fortnite calibration and map settings. XP rates can change after updates or revisions.",
  },
  {
    q: "What Squid Game maps are best to play with friends?",
    a: "Minigame and elimination-style Squid maps are usually best with a full party. They're more fun when you can run rounds quickly and compete with friends.",
  },
];

export default function SquidGameFortniteMapsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best Squid Game Fortnite Maps & Map Codes",
    description:
      "A curated list of Squid Game-style Fortnite maps and map codes built with UEFN by NLDEVS, including 99 bots survival, boss battles, sidekicks, and Red vs Blue maps.",
    url: `${SITE_URL}${PAGE_PATH}`,
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
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
          genre: `Squid Game Fortnite Map (${m.type})`,
          description: `Fortnite map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}${PAGE_PATH}#${m.code.replaceAll("-", "")}`,
          image: `${SITE_URL}${m.image}`,
          publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id="squid-collection-schema" data={pageSchema} />
      <JsonLd id="squid-faq-schema" data={faqSchema} />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Squid Game Maps" }]}
        eyebrow="Elimination rounds"
        title="Best Squid Game"
        accent="Fortnite maps"
        description="Squid-style minigames, 99 bots survival, sidekicks, boss battles, and Red vs Blue chaos built with UEFN. Each entry includes an island code and gameplay type."
        lastUpdated={LAST_UPDATED}
      />

      <ContentSection
        id="what-are-squid-maps"
        title="What are"
        accent="Squid Game Fortnite maps?"
      >
        <div className="space-y-4 text-center leading-relaxed text-gray-400 md:text-left">
          <p>
            &ldquo;Squid Game&rdquo; Fortnite maps are community-made islands
            inspired by elimination-style minigames. You&apos;ll usually see fast
            rounds, high-stakes challenges, and chaotic competition — often
            designed for playing with friends.
          </p>
          <p>
            Popular Squid-style modes include Red Light Green Light, survival
            rounds, objective minigames, 99 bots survival, boss battles, and
            party challenges. Map
            availability and XP can change over time depending on updates and
            island revisions.
          </p>
        </div>
      </ContentSection>

      <ContentSection id="squid-map-codes" title="Squid Game map" accent="codes">
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          stagger={0.07}
        >
          {squidMaps.map((m, i) => (
            <RevealItem key={m.code} className="h-full">
              <div id={m.code.replaceAll("-", "")} className="h-full">
                <FortniteMapsCard
                  src={m.image}
                  title={m.title}
                  code={m.code}
                  mode={m.type}
                  notes={m.notes}
                  href={m.detailsHref}
                  priority={i < 2}
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </ContentSection>

      <ContentSection id="tips" title="Tips for" accent="Squid maps">
        <CenteredList>
          <li>
            Play with friends: most Squid-style rounds are more fun with a full
            party and faster re-queues.
          </li>
          <li>
            If you want practice, pick bot-based variants to learn routes and
            mechanics before jumping into PvP rounds.
          </li>
          <li>
            Rotate maps if XP slows down; calibration and diminishing returns can
            vary by island and update cycle.
          </li>
          <li>
            Use voice chat or quick pings — coordination matters in elimination
            challenges and team rounds.
          </li>
        </CenteredList>
      </ContentSection>

      <ContentSection id="how-to-play" title="How to" accent="play">
        <CenteredList ordered>
          <li>Open Fortnite → Search / Discover.</li>
          <li>Enter a map code exactly (####-####-####).</li>
          <li>Join the map and follow the minigame rules (varies by island).</li>
          <li>Play with friends for the best Squid-style elimination rounds.</li>
        </CenteredList>
      </ContentSection>

      <ContentSection id="faq" title="Frequently" accent="asked">
        <FaqList items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </ContentSection>

      <ContentSection id="related" title="Related" accent="pages">
        <PillLinks
          links={[
            { href: "/best-fortnite-xp-maps", label: "XP Maps" },
            { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
            { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
            { href: "/star-wars-fortnite-maps", label: "Star Wars Maps" },
          ]}
        />
      </ContentSection>

      <BackToTop />
    </main>
  );
}
