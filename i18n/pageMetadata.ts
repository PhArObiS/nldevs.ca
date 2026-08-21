import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import { routing, type AppPathname, type Locale } from "./routing";

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
  // [locale] behaves as a catch-all: a request the middleware skipped (any
  // path containing a dot) arrives here with locale set to that filename.
  // Without this guard LOCALE_META[locale] is undefined and the page threw a
  // 500 instead of returning a 404.
  if (!hasLocale(routing.locales, locale)) notFound();

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
