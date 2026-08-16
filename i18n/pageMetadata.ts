import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import type { AppPathname, Locale } from "./routing";

/**
 * Builds a page's full Metadata from the `pageMeta` catalog.
 *
 * Every page gets a locale-correct title/description (this is the text that
 * appears in search results) plus the reciprocal hreflang set. Previously
 * each page hard-coded `canonical` to its English URL, which told Google the
 * fr/pt/es versions were duplicates of the English page — enough on its own
 * to keep them out of the index.
 */
export async function pageMetadata(
  href: Exclude<AppPathname, "/">,
  locale: Locale,
  opts: { code?: string; image?: string; noIndex?: boolean } = {}
): Promise<Metadata> {
  // Catalog keys mirror the canonical (English) route without its slash.
  const key = href.slice(1);
  const t = await getTranslations({ locale, namespace: `pageMeta.${key}` });
  const values = { code: opts.code ?? "" };

  return buildPageMetadata({
    href,
    locale,
    title: t("title", values),
    description: t("description", values),
    image: opts.image,
    noIndex: opts.noIndex,
  });
}
