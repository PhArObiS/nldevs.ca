import { useLocale, useTranslations } from "next-intl";
import JsonLd from "@/components/JsonLd";
import MapDetailHeader from "@/components/ui/MapDetailHeader";
import MapGallery from "@/components/ui/MapGallery";
import ContentSection from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import {
  PageSections,
  rawArray,
  type PageSection,
} from "./PageSections";
import { MAPS, type MapId } from "@/constants/maps";
import { absoluteUrl } from "@/i18n/metadata";
import { LOCALE_META, type AppPathname, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/constants/site";

const HUB_LINKS: Record<
  MapId,
  { href: AppPathname; labelKey: string }[]
> = {
  "star-wars-tycoon-sidekick-legends": [
    { href: "/star-wars-fortnite-maps", labelKey: "starWarsMaps" },
  ],
  "star-wars-mega-rvb": [
    { href: "/star-wars-fortnite-maps", labelKey: "starWarsMaps" },
    { href: "/fortnite-red-vs-blue-maps", labelKey: "redVsBlueMaps" },
  ],
  "star-wars-tilted-99-bots-royale": [
    { href: "/star-wars-fortnite-maps", labelKey: "starWarsMaps" },
    { href: "/fortnite-99-bots-maps", labelKey: "bots99Maps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "tmnt-mega-ramp-survival": [
    { href: "/tmnt-fortnite-maps", labelKey: "tmntMaps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "tmnt-city": [
    { href: "/tmnt-fortnite-maps", labelKey: "tmntMaps" },
    { href: "/fortnite-gun-game-maps", labelKey: "gunGameMaps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "rvb-squid-minigame": [
    { href: "/squid-game-fortnite-maps", labelKey: "squidGameMaps" },
    { href: "/fortnite-red-vs-blue-maps", labelKey: "redVsBlueMaps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "99-bots-squid-royale-boss": [
    { href: "/squid-game-fortnite-maps", labelKey: "squidGameMaps" },
    { href: "/fortnite-99-bots-maps", labelKey: "bots99Maps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "sidekick-siege-99-bots": [
    { href: "/squid-game-fortnite-maps", labelKey: "squidGameMaps" },
    { href: "/fortnite-99-bots-maps", labelKey: "bots99Maps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "99-bots-zombies-royale": [
    { href: "/fortnite-99-bots-maps", labelKey: "bots99Maps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "kpop-demon-hunters": [
    { href: "/fortnite-gun-game-maps", labelKey: "gunGameMaps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
  "rvb-players-vs-guards": [
    { href: "/fortnite-red-vs-blue-maps", labelKey: "redVsBlueMaps" },
    { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
  ],
};

type Props = {
  mapId: MapId;
  /** Category hub this map belongs to; becomes the middle breadcrumb. */
  parentHref: AppPathname;
  /**
   * Related-map links. Hrefs stay in code so they are type-checked and can
   * never be broken by a translator; the labels come from the catalog in the
   * same order.
   */
  similarHrefs: AppPathname[];
  /** Extra schema.org fields that differ per map. */
  schemaExtras?: Record<string, unknown>;
};

/**
 * Shared renderer for a single map's detail page.
 *
 * Every map page previously repeated ~150 lines of near-identical JSX. This
 * collapses them to a thin wrapper each, so a layout change happens once and
 * all four locales stay structurally in sync.
 */
export default function MapDetailPage({
  mapId,
  parentHref,
  similarHrefs,
  schemaExtras = {},
}: Props) {
  const map = MAPS[mapId];
  const locale = useLocale() as Locale;
  const t = useTranslations(`mapPages.${mapId}`);
  const tc = useTranslations("common");
  const tf = useTranslations("footer");

  // See rawArray in PageSections for why t.raw() cannot be trusted directly.
  // Sections split around the gallery because that is where the original
  // pages placed it — intro/how-to above, "why it's fun"/notes below.
  const sections = rawArray<PageSection>(t, "sections");
  const sectionsAfter = rawArray<PageSection>(t, "sectionsAfter");
  const faqs = rawArray<{ q: string; a: string }>(t, "faqs");
  const stats = rawArray<{ label: string; value: string }>(t, "stats");
  const galleryAlts = rawArray<string>(t, "gallery");
  const similarLabels = rawArray<string>(t, "similarLabels");

  const url = absoluteUrl(map.href ?? "/", locale);
  const similarLinks = [
    ...HUB_LINKS[mapId].map((link) => ({
      href: link.href,
      label: tf(link.labelKey),
    })),
    ...similarHrefs.map((href, i) => ({
      href,
      label: similarLabels[i] ?? href,
    })),
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: map.title,
    gamePlatform: "Fortnite",
    genre: t("schemaGenre"),
    url,
    // Declares which language this description is written in, so the four
    // locale versions are not read as duplicate content.
    inLanguage: LOCALE_META[locale].hreflang,
    image: `${SITE_URL}${map.image}`,
    description: t("schemaDescription"),
    additionalProperty: [
      { "@type": "PropertyValue", name: tc("islandCode"), value: map.code },
    ],
    publisher: { "@type": "Organization", name: "NLDEVS", url: SITE_URL },
    ...schemaExtras,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LOCALE_META[locale].hreflang,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="top" className="mx-auto w-full max-w-5xl px-6 py-14">
      <JsonLd id={`${mapId}-schema`} data={schema} />
      <JsonLd id={`${mapId}-faq-schema`} data={faqSchema} />

      <MapDetailHeader
        crumbs={[
          { label: tc("home"), href: "/" },
          { label: t("breadcrumbParent"), href: parentHref },
          { label: map.title },
        ]}
        eyebrow={t("eyebrow")}
        title={map.title}
        code={map.code}
        image={map.image}
        stats={stats}
        intro={t("intro", { code: map.code })}
      />

      <PageSections sections={sections} />

      <MapGallery
        title={map.title}
        images={galleryAlts.map((alt) => ({ src: map.image, alt }))}
      />

      <PageSections sections={sectionsAfter} />

      <ContentSection title={tc("similarMaps")} accent={tc("similarMapsAccent")}>
        <PillLinks links={similarLinks} />
      </ContentSection>

      <ContentSection title={tc("faqTitle")} accent={tc("faqAccent")}>
        <FaqList items={faqs} />
      </ContentSection>

      <BackToTop />
    </main>
  );
}
