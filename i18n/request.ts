import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { LOCALE_META, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale, locale }) => {
  // `requestLocale` is flagged deprecated in favour of `next/root-params`,
  // which requires Next 15.5+. This project runs Next 14, so it stays.
  // `locale` is set when a server call overrides it, e.g.
  // getTranslations({locale: 'fr'}) from generateMetadata.
  const requested = locale ?? (await requestLocale);
  const resolved = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Catalogs are split by area so no single file becomes unreviewable.
  // They are merged back into one flat namespace tree at request time.
  const [common, maps, pages] = await Promise.all([
    import(`../messages/${resolved}/common.json`),
    import(`../messages/${resolved}/maps.json`),
    import(`../messages/${resolved}/pages.json`),
  ]);

  return {
    locale: resolved,
    messages: {
      ...common.default,
      ...maps.default,
      ...pages.default,
    },
    timeZone: "America/Toronto",
    formats: {
      dateTime: {
        monthYear: { month: "long", year: "numeric" },
      },
    },
    onError(error) {
      // A missing key in fr/pt/es should degrade rather than crash the page.
      // Surfaced in dev so gaps get caught before deploy.
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n:${resolved}] ${error.message}`);
      }
    },
    getMessageFallback({ key, namespace }) {
      const path = [namespace, key].filter(Boolean).join(".");
      return process.env.NODE_ENV === "development" ? `⟪${path}⟫` : "";
    },
  };
});

export { LOCALE_META };
