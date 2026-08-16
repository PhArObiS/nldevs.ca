import type { Metadata } from "next";
import { getPathname } from "./navigation";
import {
  LOCALE_META,
  defaultLocale,
  locales,
  type AppPathname,
  type Locale,
} from "./routing";
import { SITE_URL } from "@/constants/site";

/**
 * Absolute URL for a route in a given locale.
 *
 * The root path keeps its trailing slash. Next resolves `alternates.canonical`
 * through `new URL()`, which normalises the origin to "https://host/" — so
 * stripping the slash here made the emitted canonical and the sitemap entry
 * disagree for the homepage.
 */
export function absoluteUrl(href: AppPathname, locale: Locale): string {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

/**
 * Canonical + hreflang block for a page.
 *
 * Emits a self-referencing canonical plus a reciprocal `languages` map
 * covering all four locales and `x-default`. Google requires the set to be
 * bidirectional — every locale must list every other — which is why this is
 * generated from one source rather than hand-written per page.
 */
export function buildAlternates(href: AppPathname, locale: Locale) {
  const languages: Record<string, string> = {};

  for (const l of locales) {
    languages[LOCALE_META[l].hreflang] = absoluteUrl(href, l);
  }
  // Sent to searchers whose language matches none of the four.
  languages["x-default"] = absoluteUrl(href, defaultLocale);

  return {
    canonical: absoluteUrl(href, locale),
    languages,
  };
}

/**
 * Assembles a full page Metadata object with locale-correct canonical,
 * hreflang, and Open Graph locale signalling.
 */
export function buildPageMetadata({
  href,
  locale,
  title,
  description,
  image,
  noIndex = false,
}: {
  href: AppPathname;
  locale: Locale;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(href, locale);
  const meta = LOCALE_META[locale];
  const ogImage = image?.startsWith("http") ? image : `${SITE_URL}${image ?? ""}`;

  return {
    title,
    description,
    alternates: buildAlternates(href, locale),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "NLDEVS",
      locale: meta.ogLocale,
      // Tells crawlers the same content exists under the other locales.
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => LOCALE_META[l].ogLocale),
      ...(image ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [ogImage] } : {}),
    },
  };
}
