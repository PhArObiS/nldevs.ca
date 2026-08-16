import { useFormatter, useLocale, useTranslations } from "next-intl";
import JsonLd from "@/components/JsonLd";
import FortniteMapsCard from "@/components/sub/FortniteMapsCard";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import { BackToTop, FaqList, PillLinks } from "@/components/ui/InfoCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  PageSections,
  rawArray,
  rawRecord,
  type PageSection,
} from "./PageSections";
import { MAPS, latestUpdated, mapAnchor, type MapId } from "@/constants/maps";
import { absoluteUrl } from "@/i18n/metadata";
import { LOCALE_META, type AppPathname, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/constants/site";

type Props = {
  /** Key under the `hubs` namespace. */
  hubId: string;
  href: AppPathname;
  mapIds: MapId[];
  /** Related hub links; labels come from the catalog in the same order. */
  relatedHrefs: AppPathname[];
};

/**
 * Shared renderer for a category hub (Star Wars, TMNT, Squid Game, …).
 *
 * Collapses five near-identical ~230-line pages into thin wrappers so the
 * layout is defined once and cannot drift between locales.
 */
export default function MapHubPage({
  hubId,
  href,
  mapIds,
  relatedHrefs,
}: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations(`hubs.${hubId}`);
  const tc = useTranslations("common");
  const tm = useTranslations("modes");
  const format = useFormatter();

  // Hubs differ in shape — the XP hub is a bare curated list with no intro
  // prose or FAQ, while the themed hubs carry all four blocks. Missing keys
  // resolve to empty so each hub renders only what it actually defines.
  const introSections = rawArray<PageSection>(t, "introSections");
  const tipSections = rawArray<PageSection>(t, "tipSections");
  const faqs = rawArray<{ q: string; a: string }>(t, "faqs");
  const notes = rawRecord(t, "notes");
  const relatedLabels = rawArray<string>(t, "relatedLabels");
  /**
   * The XP hub classifies maps by how you earn XP ("Active", "Mixed")
   * rather than by game mode, so it overrides the badge per map.
   */
  const modeOverrides = rawRecord(t, "modeOverrides");
  /**
   * The Gun Game hub reframes shared maps ("TMNT City — Gun Game"), so a hub
   * may relabel a card without changing the island's real name elsewhere.
   */
  const titleOverrides = rawRecord(t, "titleOverrides");
  /** Franchise disclaimer, currently only on the Star Wars hub. */
  const disclaimer = t.has("disclaimer") ? t("disclaimer") : null;

  const url = absoluteUrl(href, locale);
  const inLanguage = LOCALE_META[locale].hreflang;

  // Derived from the maps this hub lists, then formatted for the locale —
  // so the header, the cards and the sitemap all report the same thing.
  const newest = latestUpdated(mapIds);
  const lastUpdated = newest
    ? format.dateTime(new Date(`${newest}-01T12:00:00Z`), {
        month: "long",
        year: "numeric",
      })
    : undefined;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("schemaName"),
    description: t("schemaDescription"),
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", name: "NLDEVS", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      name: t("listName"),
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: mapIds.length,
      itemListElement: mapIds.map((id, i) => {
        const m = MAPS[id];
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoGame",
            name: m.title,
            gamePlatform: "Fortnite",
            genre: t("genre"),
            description: `${tc("mapCode")}: ${m.code}. ${notes[id] ?? ""}`,
            url: `${url}#${mapAnchor(m.code)}`,
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

  // Emitted only when the hub actually has FAQs — an empty FAQPage is an
  // invalid rich result and Search Console flags it.
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage,
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <JsonLd id={`${hubId}-collection-schema`} data={pageSchema} />
      {faqSchema && <JsonLd id={`${hubId}-faq-schema`} data={faqSchema} />}

      <PageHeader
        crumbs={[{ label: tc("home"), href: "/" }, { label: t("breadcrumb") }]}
        eyebrow={t("eyebrow")}
        title={t.rich("title", {
          accent: (chunks) => <span className="neon-text">{chunks}</span>,
        })}
        description={t("description")}
        lastUpdated={lastUpdated}
      />

      <PageSections sections={introSections} />

      <ContentSection
        id={`${hubId}-codes`}
        title={t("codesTitle")}
        accent={t("codesAccent")}
      >
        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          stagger={0.07}
        >
          {mapIds.map((id, i) => {
            const m = MAPS[id];
            const updated = format.dateTime(
              new Date(`${m.updated}-01T12:00:00Z`),
              { month: "long", year: "numeric" }
            );

            return (
              <RevealItem key={m.code} className="h-full">
                {/* Anchor target referenced by the ItemList schema above. */}
                <div id={mapAnchor(m.code)} className="h-full">
                  <FortniteMapsCard
                    src={m.image}
                    title={titleOverrides[id] ?? m.title}
                    code={m.code}
                    mode={modeOverrides[id] ?? tm(m.mode)}
                    status={m.status}
                    updated={updated}
                    notes={notes[id]}
                    href={m.href}
                    priority={i < 2}
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </ContentSection>

      <PageSections sections={tipSections} />

      <ContentSection title={tc("faqTitle")} accent={tc("faqAccent")}>
        <FaqList items={faqs} />
      </ContentSection>

      <ContentSection
        title={tc("relatedPages")}
        accent={tc("relatedPagesAccent")}
      >
        <PillLinks
          links={relatedHrefs.map((h, i) => ({
            href: h,
            label: relatedLabels[i] ?? h,
          }))}
        />
      </ContentSection>

      {disclaimer && (
        <p className="mt-16 text-center text-sm text-gray-500">{disclaimer}</p>
      )}

      <BackToTop />
    </main>
  );
}
