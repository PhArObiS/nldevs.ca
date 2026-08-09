import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AboutContent from "@/components/sub/AboutContent";
import FortniteMaps from "@/components/main/FortniteMaps";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import WhyPlayOurMaps from "@/components/main/WhyPlayOurMaps";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_LOGO_URL, SITE_URL, SOCIAL_LINKS } from "@/constants/site";

const featuredMaps: {
  title: string;
  code: string;
  image: string;
  category: string;
  notes: string;
  detailsHref?: string;
}[] = [
  {
    title: "Star Wars Tycoon Sidekick Legends",
    code: "3205-2388-4588",
    image: "/TycoonSidekicks.jpg",
    category: "COMING SOON / Star Wars Tycoon",
    notes:
      "Coming soon: Star Wars Tycoon launch with Sidekick and Hero unlocks, new sections, workers, rebirth leaderboard climbing, auto-saving progress, and up to 4 players.",
    detailsHref: "/star-wars-tycoon-sidekick-legends",
  },
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    category: "TMNT / Survival",
    notes: "High-speed ramp survival with TMNT vibes and replayable runs.",
    detailsHref: "/tmnt-mega-ramp-survival",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpg",
    category: "TMNT / Experience",
    notes: "Explore a TMNT-themed city experience built in UEFN.",
    detailsHref: "/tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    category: "Squid Game / RvB",
    notes: "Squid-style minigames with fast rounds and team chaos.",
    detailsHref: "/rvb-squid-minigame",
  },
  {
    title: "99 Bots Squid Royale Boss",
    code: "0596-3765-4845",
    image: "/99 Bots Squid Royale Boss.jpg",
    category: "Squid Game / 99 Bots",
    notes:
      "Open-world PvE survival with 99 bots, boss battles, new weapons, wildlife riding, ranks, leaderboards, and saved stats.",
    detailsHref: "/99-bots-squid-royale-boss",
  },
  {
    title: "Sidekick Siege 99 Bots",
    code: "5577-7953-8449",
    image: "/Squid99BotsSidekicks.jpg",
    category: "Squid Game / Sidekicks",
    notes:
      "Sidekick-focused 99-bot survival with boss battles, PvE action, saved loadouts, ranks, leaderboards, and up to 5 players.",
    detailsHref: "/sidekick-siege-99-bots",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    category: "Gun Game / FFA",
    notes:
      "Holiday demon-hunting gun game with weapon rotations and repeat loops.",
    detailsHref: "/winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    category: "RvB / PvP",
    notes: "Team-based action with guards — good for longer sessions.",
  },
];

const faqs: { q: string; a: ReactNode; plain: string }[] = [
  {
    q: "How do I play a Fortnite island code?",
    a: "Open Fortnite → Search/Discover, enter the island code (####-####-####), then join the island.",
    plain:
      "Open Fortnite → Search/Discover, enter the island code (####-####-####), then join the island.",
  },
  {
    q: "What are the best Fortnite XP maps?",
    a: (
      <>
        XP maps can change with updates and calibration. We maintain a curated
        list on our{" "}
        <Link
          href="/best-fortnite-xp-maps"
          className="text-neon-cyan underline underline-offset-2 hover:text-white"
        >
          Best Fortnite XP Maps
        </Link>{" "}
        page.
      </>
    ),
    plain:
      "XP maps vary by update and calibration. We maintain a curated list of efficient XP maps on our Best Fortnite XP Maps page.",
  },
  {
    q: "What is the newest NLDEVS Fortnite map?",
    a: (
      <>
        Our upcoming featured launch is{" "}
        <Link
          href="/star-wars-tycoon-sidekick-legends"
          className="text-neon-cyan underline underline-offset-2 hover:text-white"
        >
          Star Wars Tycoon Sidekick Legends
        </Link>
        , a coming soon Star Wars Tycoon map with Sidekick and Hero unlocks, new sections,
        workers, rebirth leaderboard climbing, auto-saving progress, and up to 4
        players.
      </>
    ),
    plain:
      "Our upcoming featured launch is Star Wars Tycoon Sidekick Legends, a coming soon Star Wars Tycoon map with Sidekick and Hero unlocks, new sections, workers, rebirth leaderboard climbing, auto-saving progress, and up to 4 players.",
  },
  {
    q: "Are these maps made with UEFN?",
    a: "Yes — our games are built with Unreal Editor for Fortnite (UEFN) with a focus on replayability and fun gameplay loops.",
    plain:
      "Yes — our games are built with Unreal Editor for Fortnite (UEFN) with a focus on replayability and fun gameplay loops.",
  },
];

export default function Home() {
  /* ===============================
     PAGE STRUCTURED DATA (SEO)
     Organization + WebSite schema live in app/layout.tsx so they are emitted
     exactly once site-wide. Do not duplicate them here.
  =============================== */

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NLDEVS — UEFN Game Studio (Fortnite Experiences & Map Codes)",
    description:
      "NLDEVS is a UEFN game studio building Fortnite experiences. Explore our published games and get island codes, screenshots, and gameplay notes.",
    url: `${SITE_URL}/`,
    image: SITE_LOGO_URL,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: SITE_LOGO_URL,
      width: 250,
      height: 250,
    },
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      name: "NLDEVS Featured Fortnite Experiences",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: featuredMaps.length,
      itemListElement: featuredMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: m.category,
          description: `Fortnite island code: ${m.code}. ${m.notes}`,
          url: m.detailsHref
            ? `${SITE_URL}${m.detailsHref}`
            : `${SITE_URL}/#${m.code.replaceAll("-", "")}`,
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
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <main className="w-full">
      <JsonLd id="homepage-schema" data={pageSchema} />
      <JsonLd id="homepage-faq-schema" data={faqSchema} />

      <Hero />

      <AboutContent />

      <WhyPlayOurMaps />

      {/* FEATURED MAPS */}
      <section
        id="featured-fortnite-maps"
        aria-labelledby="featured-title"
        className="mx-auto w-full max-w-7xl px-6 py-20"
      >
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow="Island codes"
            title="Featured"
            accent="NLDEVS games"
            description="Explore live experiences and new launches. Tap a card for the full details, or copy the code and jump straight in."
          />
        </Reveal>

        {/* Hidden anchors for schema URLs */}
        <div className="sr-only">
          {featuredMaps.map((m) => (
            <span key={m.code} id={m.code.replaceAll("-", "")}>
              {m.title}
            </span>
          ))}
        </div>

        <FortniteMaps />

        <Reveal className="mt-12 text-center">
          <a
            href={SOCIAL_LINKS.fortnite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost clip-corner-sm"
          >
            Browse all maps on Fortnite.com
          </a>
        </Reveal>
      </section>

      {/* XP CTA */}
      <section
        id="xp-maps"
        aria-labelledby="xp-title"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden border border-edge/70 bg-ink-800/50 px-8 py-14 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="eyebrow">Level up faster</p>

              <h2
                id="xp-title"
                className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
              >
                Looking for <span className="neon-text">XP maps?</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Browse our best Fortnite XP maps and island codes to level up
                efficiently.
              </p>

              <Link
                href="/best-fortnite-xp-maps"
                className="btn-neon clip-corner-sm mt-8"
              >
                View best XP maps
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto w-full max-w-4xl px-6 pb-24"
      >
        <Reveal>
          <SectionHeading
            id="faq-title"
            eyebrow="Questions"
            title="Frequently"
            accent="asked"
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4">
          {faqs.map((f) => (
            <RevealItem key={f.q}>
              <div className="clip-corner border border-edge/70 bg-ink-800/50 p-6 transition-colors duration-300 hover:border-neon-cyan/50">
                <h3 className="font-bold text-white">{f.q}</h3>
                <p className="mt-2.5 leading-relaxed text-gray-400">{f.a}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Footer />
    </main>
  );
}
