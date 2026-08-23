import { defineRouting } from "next-intl/routing";

/**
 * URL locale segments. Kept short (`/fr`) rather than full tags (`/fr-FR`)
 * because these are language targets, not country targets — see LOCALE_META
 * for the hreflang codes actually emitted to crawlers.
 */
export const locales = ["en", "fr", "pt", "es", "ru", "pl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * hreflang + display data per locale.
 *
 * `hreflang` intentionally differs from the URL segment:
 *  - `pt` targets Brazil (`pt-BR`), the largest Fortnite market by a wide
 *    margin, not European Portuguese.
 *  - `es` uses `es-419` (UN code for Latin America) so the pages are not
 *    geo-scoped to Spain.
 * `htmlLang` is what lands in <html lang>, and drives screen-reader
 * pronunciation and browser translation prompts.
 */
export const LOCALE_META: Record<
  Locale,
  { hreflang: string; htmlLang: string; label: string; ogLocale: string }
> = {
  en: { hreflang: "en", htmlLang: "en", label: "English", ogLocale: "en_US" },
  fr: { hreflang: "fr", htmlLang: "fr", label: "Français", ogLocale: "fr_FR" },
  pt: {
    hreflang: "pt-BR",
    htmlLang: "pt-BR",
    label: "Português",
    ogLocale: "pt_BR",
  },
  es: {
    hreflang: "es-419",
    htmlLang: "es-419",
    label: "Español",
    // Open Graph has no "419" territory; es_LA is the Latin America value
    // social platforms accept, and matches the audience better than es_ES.
    ogLocale: "es_LA",
  },
  ru: { hreflang: "ru", htmlLang: "ru", label: "Русский", ogLocale: "ru_RU" },
  pl: { hreflang: "pl", htmlLang: "pl", label: "Polski", ogLocale: "pl_PL" },
};

/**
 * Per-locale slugs.
 *
 * These are keyword targets, not literal translations. Where a franchise
 * ships under a different name in a market, the slug follows the market:
 *  - Squid Game is "Round 6" in Brazil (Netflix BR title) and
 *    "El Juego del Calamar" across Latin America.
 *  - TMNT localizes fully: Tortues Ninja / Tartarugas Ninja / Tortugas Ninja.
 *  - Winterfest is Epic's own event, localized as Epic localizes it.
 * Product names that ship in English inside Fortnite itself (Tycoon Sidekick
 * Legends, Tilted, RvB, Gun Game) stay put — that is what players search.
 *
 * Slugs are ASCII-only on purpose: no accents, so URLs never percent-encode.
 */
export const pathnames = {
  "/": "/",

  // ---- Category hubs -----------------------------------------------------
  "/star-wars-fortnite-maps": {
    en: "/star-wars-fortnite-maps",
    fr: "/cartes-fortnite-star-wars",
    pt: "/mapas-fortnite-star-wars",
    es: "/mapas-fortnite-star-wars",
    ru: "/karty-fortnite-star-wars",
    pl: "/mapy-fortnite-star-wars",
  },
  "/tmnt-fortnite-maps": {
    en: "/tmnt-fortnite-maps",
    fr: "/cartes-fortnite-tortues-ninja",
    pt: "/mapas-fortnite-tartarugas-ninja",
    es: "/mapas-fortnite-tortugas-ninja",
    ru: "/karty-fortnite-cherepashki-nindzya",
    pl: "/mapy-fortnite-wojownicze-zolwie-ninja",
  },
  "/squid-game-fortnite-maps": {
    en: "/squid-game-fortnite-maps",
    fr: "/cartes-fortnite-squid-game",
    pt: "/mapas-fortnite-round-6",
    es: "/mapas-fortnite-el-juego-del-calamar",
    ru: "/karty-fortnite-igra-v-kalmara",
    pl: "/mapy-fortnite-squid-game",
  },
  "/fortnite-gun-game-maps": {
    en: "/fortnite-gun-game-maps",
    fr: "/cartes-fortnite-gun-game",
    pt: "/mapas-fortnite-gun-game",
    es: "/mapas-fortnite-gun-game",
    ru: "/karty-fortnite-gun-game",
    pl: "/mapy-fortnite-gun-game",
  },
  "/best-fortnite-xp-maps": {
    en: "/best-fortnite-xp-maps",
    fr: "/meilleures-cartes-xp-fortnite",
    pt: "/melhores-mapas-de-xp-fortnite",
    es: "/mejores-mapas-de-xp-fortnite",
    ru: "/luchshie-karty-xp-fortnite",
    pl: "/najlepsze-mapy-xp-fortnite",
  },
  // "99 bots" is a mode players search by name, so the number carries across
  // every locale untranslated.
  "/fortnite-99-bots-maps": {
    en: "/fortnite-99-bots-maps",
    fr: "/cartes-fortnite-99-bots",
    pt: "/mapas-fortnite-99-bots",
    es: "/mapas-fortnite-99-bots",
    ru: "/karty-fortnite-99-bots",
    pl: "/mapy-fortnite-99-bots",
  },
  "/fortnite-red-vs-blue-maps": {
    en: "/fortnite-red-vs-blue-maps",
    fr: "/cartes-fortnite-rouge-contre-bleu",
    pt: "/mapas-fortnite-vermelho-vs-azul",
    es: "/mapas-fortnite-rojo-vs-azul",
    ru: "/karty-fortnite-krasnye-protiv-sinih",
    pl: "/mapy-fortnite-czerwoni-kontra-niebiescy",
  },

  // ---- Map detail pages --------------------------------------------------
  "/star-wars-tycoon-sidekick-legends": {
    en: "/star-wars-tycoon-sidekick-legends",
    fr: "/star-wars-tycoon-sidekick-legends",
    pt: "/star-wars-tycoon-sidekick-legends",
    es: "/star-wars-tycoon-sidekick-legends",
    ru: "/star-wars-tycoon-sidekick-legends",
    pl: "/star-wars-tycoon-sidekick-legends",
  },
  "/star-wars-mega-rvb": {
    en: "/star-wars-mega-rvb",
    fr: "/star-wars-mega-rvb",
    pt: "/star-wars-mega-rvb",
    es: "/star-wars-mega-rvb",
    ru: "/star-wars-mega-rvb",
    pl: "/star-wars-mega-rvb",
  },
  "/star-wars-tilted-99-bots-royale": {
    en: "/star-wars-tilted-99-bots-royale",
    fr: "/star-wars-tilted-99-bots-royale",
    pt: "/star-wars-tilted-99-bots-royale",
    es: "/star-wars-tilted-99-bots-royale",
    ru: "/star-wars-tilted-99-bots-royale",
    pl: "/star-wars-tilted-99-bots-royale",
  },
  "/tmnt-mega-ramp-survival": {
    en: "/tmnt-mega-ramp-survival",
    fr: "/tortues-ninja-mega-rampe-survie",
    pt: "/tartarugas-ninja-mega-rampa-sobrevivencia",
    es: "/tortugas-ninja-mega-rampa-supervivencia",
    ru: "/cherepashki-nindzya-mega-rampa-vyzhivanie",
    pl: "/wojownicze-zolwie-ninja-mega-rampa-przetrwanie",
  },
  "/tmnt-city": {
    en: "/tmnt-city",
    fr: "/ville-tortues-ninja",
    pt: "/cidade-tartarugas-ninja",
    es: "/ciudad-tortugas-ninja",
    ru: "/gorod-cherepashki-nindzya",
    pl: "/miasto-wojownicze-zolwie-ninja",
  },
  "/rvb-squid-minigame": {
    en: "/rvb-squid-minigame",
    fr: "/mini-jeu-squid-rvb",
    pt: "/minigame-round-6-rvb",
    es: "/minijuego-calamar-rvb",
    ru: "/mini-igra-kalmar-rvb",
    pl: "/minigra-squid-rvb",
  },
  "/99-bots-squid-royale-boss": {
    en: "/99-bots-squid-royale-boss",
    fr: "/99-bots-squid-royale-boss",
    pt: "/99-bots-round-6-royale-boss",
    es: "/99-bots-calamar-royale-boss",
    ru: "/99-bots-kalmar-royale-boss",
    pl: "/99-bots-squid-royale-boss",
  },
  "/sidekick-siege-99-bots": {
    en: "/sidekick-siege-99-bots",
    fr: "/siege-sidekick-99-bots",
    pt: "/cerco-sidekick-99-bots",
    es: "/asedio-sidekick-99-bots",
    ru: "/osada-sidekick-99-bots",
    pl: "/oblezenie-sidekick-99-bots",
  },
  "/winterfest-demon-hunters": {
    en: "/winterfest-demon-hunters",
    fr: "/fete-hivernale-chasseurs-de-demons",
    pt: "/festa-invernal-cacadores-de-demonios",
    es: "/fiesta-invernal-cazadores-de-demonios",
    ru: "/zimniy-festival-ohotniki-na-demonov",
    pl: "/winterfest-lowcy-demonow",
  },
  "/rvb-players-vs-guards": {
    en: "/rvb-players-vs-guards",
    fr: "/rvb-joueurs-contre-gardes",
    pt: "/rvb-jogadores-vs-guardas",
    es: "/rvb-jugadores-vs-guardias",
    ru: "/rvb-igroki-protiv-ohrany",
    pl: "/rvb-gracze-kontra-straznicy",
  },

  // ---- Standalone pages --------------------------------------------------
  "/playtest-squad": {
    en: "/playtest-squad",
    fr: "/escouade-playtest",
    pt: "/esquadrao-de-playtest",
    es: "/escuadron-de-playtest",
    ru: "/komanda-pleytesta",
    pl: "/druzyna-playtestow",
  },
  "/uefn-contracts": {
    en: "/uefn-contracts",
    fr: "/contrats-uefn",
    pt: "/contratos-uefn",
    es: "/contratos-uefn",
    ru: "/kontrakty-uefn",
    pl: "/kontrakty-uefn",
  },
  "/privacy": {
    en: "/privacy",
    fr: "/confidentialite",
    pt: "/privacidade",
    es: "/privacidad",
    ru: "/konfidentsialnost",
    pl: "/prywatnosc",
  },

  // ---- Internal ----------------------------------------------------------
  // Lives inside the [locale] tree only so the app keeps a single root
  // layout. Same slug everywhere, English-only UI, excluded from the sitemap.
  "/admin/leads": "/admin/leads",
} as const;

export type AppPathname = keyof typeof pathnames;

/** Routes kept out of the sitemap and hreflang graph. */
const PRIVATE_PATHNAMES: AppPathname[] = ["/admin/leads"];

/** Every public canonical (English-keyed) route, for sitemap generation. */
export const ALL_PATHNAMES = (
  Object.keys(pathnames) as AppPathname[]
).filter((p) => !PRIVATE_PATHNAMES.includes(p));

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English keeps its bare URLs (/best-fortnite-xp-maps) so existing rankings
  // and backlinks survive untouched; only fr/pt/es take a prefix.
  localePrefix: "as-needed",
  // Respect Accept-Language on first visit, then remember the choice.
  localeDetection: true,
  pathnames,
});
