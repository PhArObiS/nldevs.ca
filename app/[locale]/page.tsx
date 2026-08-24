import type { Metadata } from "next";
import { hasLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import AboutContent from "@/components/sub/AboutContent";
import FortniteMaps from "@/components/main/FortniteMaps";
import Hero from "@/components/main/Hero";
import WhyPlayOurMaps from "@/components/main/WhyPlayOurMaps";
import GameplayVideo from "@/components/ui/GameplayVideo";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { buildAlternates, absoluteUrl } from "@/i18n/metadata";
import { LOCALE_META, locales, routing, type Locale } from "@/i18n/routing";
import { FEATURED_MAP_IDS, MAPS, mapAnchor } from "@/constants/maps";
import { SITE_LOGO_URL, SITE_URL, SOCIAL_LINKS } from "@/constants/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    alternates: buildAlternates("/", locale),
  };
}

/** Notes + category shown per featured map, keyed to the catalog. */
const FEATURED_COPY: Record<string, { notes: string; category: string }> = {
  "star-wars-tycoon-sidekick-legends": {
    notes: "notesTycoon",
    category: "categoryTycoon",
  },
  "tmnt-mega-ramp-survival": {
    notes: "notesMegaRamp",
    category: "categoryMegaRamp",
  },
  "tmnt-city": { notes: "notesTmntCity", category: "categoryTmntCity" },
  "rvb-squid-minigame": {
    notes: "notesRvbSquid",
    category: "categoryRvbSquid",
  },
  "99-bots-squid-royale-boss": {
    notes: "notesSquidRoyale",
    category: "categorySquidRoyale",
  },
  "sidekick-siege-99-bots": {
    notes: "notesSidekickSiege",
    category: "categorySidekickSiege",
  },
  "kpop-demon-hunters": {
    notes: "notesKpop",
    category: "categoryKpop",
  },
  "rvb-players-vs-guards": {
    notes: "notesPlayersVsGuards",
    category: "categoryPlayersVsGuards",
  },
};

const FEATURED_GAMEPLAY_VIDEO_ID = "";

export default function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const inLanguage = LOCALE_META[locale].hreflang;

  const accent = {
    accent: (chunks: React.ReactNode) => (
      <span className="neon-text">{chunks}</span>
    ),
  };

  /* ===============================
     PAGE STRUCTURED DATA (SEO)
     Organization + WebSite schema live in the locale layout so they are
     emitted exactly once site-wide. Do not duplicate them here.
  =============================== */
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("schemaName"),
    description: t("schemaDescription"),
    url: absoluteUrl("/", locale),
    inLanguage,
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
      name: t("featuredListName"),
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: FEATURED_MAP_IDS.length,
      itemListElement: FEATURED_MAP_IDS.map((id, i) => {
        const m = MAPS[id];
        const copy = FEATURED_COPY[id];
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoGame",
            name: m.title,
            gamePlatform: "Fortnite",
            genre: t(copy.category),
            description: `${tc("islandCode")}: ${m.code}. ${t(copy.notes)}`,
            url: m.href
              ? absoluteUrl(m.href, locale)
              : `${absoluteUrl("/", locale)}#${mapAnchor(m.code)}`,
            image: `${SITE_URL}${m.image}`,
            publisher: {
              "@type": "Organization",
              name: "NLDEVS",
              url: SITE_URL,
            },
          },
        };
      }),
    },
  };

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2Plain") },
    { q: t("faq3Q"), a: t("faq3Plain") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="w-full">
      <JsonLd id="homepage-schema" data={pageSchema} />
      <JsonLd id="homepage-faq-schema" data={faqSchema} />

      <Hero />

      <AboutContent />

      <WhyPlayOurMaps />

      {/* UEFN CONTRACTS CTA */}
      <section
        id="uefn-contracts-home"
        aria-labelledby="uefn-contracts-home-title"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden border border-neon-violet/60 bg-ink-900/75 px-6 py-10 md:px-10">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
              aria-hidden="true"
            />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">{t("contractsEyebrow")}</p>
                <h2
                  id="uefn-contracts-home-title"
                  className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl"
                >
                  {t.rich("contractsTitle", accent)}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
                  {t("contractsBody")}
                </p>
              </div>
              <Link
                href="/uefn-contracts"
                className="btn-neon clip-corner-sm justify-self-start lg:justify-self-end"
              >
                {t("contractsCta")}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* GAMEPLAY SPOTLIGHT */}
      <section
        id="gameplay-spotlight"
        aria-labelledby="gameplay-spotlight-title"
        className="mx-auto w-full max-w-6xl px-6 py-20"
      >
        <Reveal>
          <SectionHeading
            id="gameplay-spotlight-title"
            eyebrow={t("spotlightEyebrow")}
            title={t.rich("spotlightTitle", accent)}
            description={t("spotlightDescription")}
          />
        </Reveal>

        <Reveal className="mt-12">
          <GameplayVideo
            title={MAPS["star-wars-tycoon-sidekick-legends"].title}
            description={t("spotlightMapDescription")}
            poster="/TycoonSidekicks.jpg"
            youtubeId={FEATURED_GAMEPLAY_VIDEO_ID || undefined}
            ctaHref="/star-wars-tycoon-sidekick-legends"
            ctaLabel={tc("viewMap")}
          />
        </Reveal>
      </section>

      {/* PLAYTEST CTA */}
      <section
        id="playtest-squad"
        aria-labelledby="playtest-squad-title"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <Reveal>
          <div className="clip-corner relative overflow-hidden border border-neon-cyan/40 bg-ink-800/60 px-6 py-12 md:px-10">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="eyebrow">{t("communityEyebrow")}</p>
                <h2
                  id="playtest-squad-title"
                  className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl"
                >
                  {t.rich("communityTitle", accent)}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
                  {t("communityBody")}
                </p>
                <p className="mt-3 text-sm font-semibold text-gray-500">
                  {t("communityNote")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href={SOCIAL_LINKS.fortnite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon clip-corner-sm justify-self-start"
                >
                  {tc("followNldevs")}
                </a>
                <Link
                  href="/playtest-squad"
                  className="btn-ghost clip-corner-sm justify-self-start"
                >
                  {t("communityJoin")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURED MAPS */}
      <section
        id="featured-fortnite-maps"
        aria-labelledby="featured-title"
        className="mx-auto w-full max-w-7xl px-6 py-20"
      >
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow={t("featuredEyebrow")}
            title={t.rich("featuredTitle", accent)}
            description={t("featuredDescription")}
          />
        </Reveal>

        {/* Hidden anchors for schema URLs */}
        <div className="sr-only">
          {FEATURED_MAP_IDS.map((id) => (
            <span key={id} id={mapAnchor(MAPS[id].code)}>
              {MAPS[id].title}
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
            {t("browseFortnite")}
          </a>
        </Reveal>
      </section>

      {/* STUDIO UPDATES */}
      <section
        id="studio-updates"
        aria-labelledby="studio-updates-title"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <Reveal>
          <SectionHeading
            id="studio-updates-title"
            eyebrow={t("updatesEyebrow")}
            title={t.rich("updatesTitle", accent)}
            description={t("updatesDescription")}
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {(["1", "2", "3"] as const).map((n) => (
            <RevealItem key={n}>
              <article className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6 transition-colors hover:border-neon-cyan/60">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-cyan">
                  {t("updateBadge")}
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {t(`update${n}Title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {t(`update${n}Text`)}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* PLAYER REACTIONS */}
      <section
        id="player-reactions"
        aria-labelledby="player-reactions-title"
        className="mx-auto w-full max-w-6xl px-6 pb-20"
      >
        <Reveal>
          <SectionHeading
            id="player-reactions-title"
            eyebrow={t("reactionsEyebrow")}
            title={t.rich("reactionsTitle", accent)}
            description={t("reactionsDescription")}
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {(["1", "2", "3"] as const).map((n) => (
            <RevealItem key={n}>
              <figure className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6 transition-colors hover:border-neon-magenta/60">
                <blockquote className="text-lg font-semibold leading-relaxed text-white">
                  &ldquo;{t(`reaction${n}Quote`)}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-neon-cyan">
                  {t(`reaction${n}Label`)}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
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
              <p className="eyebrow">{t("xpEyebrow")}</p>

              <h2
                id="xp-title"
                className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
              >
                {t.rich("xpTitle", accent)}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                {t("xpBody")}
              </p>

              <Link
                href="/best-fortnite-xp-maps"
                className="btn-neon clip-corner-sm mt-8"
              >
                {t("xpCta")}
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
            eyebrow={t("faqEyebrow")}
            title={t.rich("faqTitle", accent)}
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4">
          <RevealItem>
            <FaqEntry q={t("faq1Q")} a={t("faq1A")} />
          </RevealItem>
          <RevealItem>
            <FaqEntry
              q={t("faq2Q")}
              a={t.rich("faq2A", {
                link: (chunks) => (
                  <Link
                    href="/best-fortnite-xp-maps"
                    className="text-neon-cyan underline underline-offset-2 hover:text-white"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            />
          </RevealItem>
          <RevealItem>
            <FaqEntry
              q={t("faq3Q")}
              a={t.rich("faq3A", {
                link: (chunks) => (
                  <Link
                    href="/star-wars-tycoon-sidekick-legends"
                    className="text-neon-cyan underline underline-offset-2 hover:text-white"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            />
          </RevealItem>
          <RevealItem>
            <FaqEntry q={t("faq4Q")} a={t("faq4A")} />
          </RevealItem>
        </RevealGroup>
      </section>
    </main>
  );
}

function FaqEntry({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="clip-corner border border-edge/70 bg-ink-800/50 p-6 transition-colors duration-300 hover:border-neon-cyan/50">
      <h3 className="font-bold text-white">{q}</h3>
      <p className="mt-2.5 leading-relaxed text-gray-400">{a}</p>
    </div>
  );
}
