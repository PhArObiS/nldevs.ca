import type { AppPathname } from "@/i18n/routing";

/**
 * Single source of truth for every published map.
 *
 * Previously this data was copy-pasted across app/page.tsx, FortniteMaps.tsx
 * and each hub page, which meant a code or image change had to be made in
 * several places. Locale-independent facts live here; everything a human
 * reads (category, notes, stats, body copy) lives in messages/<locale>/ and
 * is looked up by `id`.
 *
 * `title` deliberately stays English and untranslated: it is the actual
 * island name inside Fortnite, and a player searching Discover for the map
 * types the English name regardless of the language they browse the site in.
 * Translating it would make the map harder to find, not easier.
 */
export type MapId =
  | "star-wars-tycoon-sidekick-legends"
  | "star-wars-mega-rvb"
  | "star-wars-tilted-99-bots-royale"
  | "tmnt-mega-ramp-survival"
  | "tmnt-city"
  | "rvb-squid-minigame"
  | "99-bots-squid-royale-boss"
  | "sidekick-siege-99-bots"
  | "winterfest-demon-hunters"
  | "rvb-players-vs-guards";

/** Message keys under the `status` / `modes` namespaces. */
export type MapStatus = "live" | "testing" | "comingSoon";

export type MapEntry = {
  id: MapId;
  /** In-game island name — see note above on why this is not translated. */
  title: string;
  code: string;
  image: string;
  /** Detail page, when one exists. Cards without it render unlinked. */
  href?: AppPathname;
  status: MapStatus;
  /** Message key under `modes`. */
  mode: string;
  /** ISO year-month; formatted per-locale at render time. */
  updated: string;
};

export const MAPS: Record<MapId, MapEntry> = {
  "star-wars-tycoon-sidekick-legends": {
    id: "star-wars-tycoon-sidekick-legends",
    title: "Star Wars Tycoon Sidekick Legends",
    code: "3205-2388-4588",
    image: "/TycoonSidekicks.jpg",
    href: "/star-wars-tycoon-sidekick-legends",
    status: "comingSoon",
    mode: "tycoon",
    updated: "2026-08",
  },
  "star-wars-mega-rvb": {
    id: "star-wars-mega-rvb",
    title: "Star Wars Mega RvB",
    code: "7323-8876-4862",
    image: "/StarWarsRvB.jpg",
    href: "/star-wars-mega-rvb",
    status: "live",
    mode: "redVsBlue",
    updated: "2026-08",
  },
  "star-wars-tilted-99-bots-royale": {
    id: "star-wars-tilted-99-bots-royale",
    title: "Star Wars Tilted 99 Bots Royale",
    code: "1116-7765-9076",
    image: "/StarWarsTilted99BotsRoyale.jpg",
    href: "/star-wars-tilted-99-bots-royale",
    status: "live",
    mode: "bots99",
    updated: "2026-08",
  },
  "tmnt-mega-ramp-survival": {
    id: "tmnt-mega-ramp-survival",
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    href: "/tmnt-mega-ramp-survival",
    status: "live",
    mode: "survival",
    updated: "2026-08",
  },
  "tmnt-city": {
    id: "tmnt-city",
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpg",
    href: "/tmnt-city",
    status: "live",
    mode: "adventure",
    updated: "2026-08",
  },
  "rvb-squid-minigame": {
    id: "rvb-squid-minigame",
    title: "RvB 🔴🔵 Squid Minigame 🦑",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    href: "/rvb-squid-minigame",
    status: "live",
    mode: "minigames",
    updated: "2026-08",
  },
  "99-bots-squid-royale-boss": {
    id: "99-bots-squid-royale-boss",
    title: "99 Bots Squid Royale Boss",
    code: "0596-3765-4845",
    image: "/99 Bots Squid Royale Boss.jpg",
    href: "/99-bots-squid-royale-boss",
    status: "live",
    mode: "bots99",
    updated: "2026-07",
  },
  "sidekick-siege-99-bots": {
    id: "sidekick-siege-99-bots",
    title: "Sidekick Siege 99 Bots",
    code: "5577-7953-8449",
    image: "/Squid99BotsSidekicks.jpg",
    href: "/sidekick-siege-99-bots",
    status: "live",
    mode: "sidekicks",
    updated: "2026-08",
  },
  "winterfest-demon-hunters": {
    id: "winterfest-demon-hunters",
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    href: "/winterfest-demon-hunters",
    status: "live",
    mode: "gunGame",
    updated: "2026-08",
  },
  "rvb-players-vs-guards": {
    id: "rvb-players-vs-guards",
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    // No detail page yet — card renders without a link.
    status: "live",
    mode: "redVsBlue",
    updated: "2026-08",
  },
};

/** Order shown in the homepage featured grid. */
export const FEATURED_MAP_IDS: MapId[] = [
  "star-wars-tycoon-sidekick-legends",
  "tmnt-mega-ramp-survival",
  "tmnt-city",
  "rvb-squid-minigame",
  "99-bots-squid-royale-boss",
  "sidekick-siege-99-bots",
  "winterfest-demon-hunters",
  "rvb-players-vs-guards",
];

/**
 * Maps listed on each category hub.
 *
 * Maps intentionally appear on more than one hub — TMNT City is both a TMNT
 * experience and a Gun Game island, and the XP hub is a cross-category
 * curated list rather than a theme.
 */
export const HUB_MAP_IDS: Record<string, MapId[]> = {
  starWars: [
    "star-wars-tycoon-sidekick-legends",
    "star-wars-mega-rvb",
    "star-wars-tilted-99-bots-royale",
  ],
  tmnt: ["tmnt-mega-ramp-survival", "tmnt-city"],
  squidGame: [
    "rvb-squid-minigame",
    "99-bots-squid-royale-boss",
    "sidekick-siege-99-bots",
  ],
  gunGame: ["tmnt-city", "winterfest-demon-hunters"],
  xp: [
    "tmnt-mega-ramp-survival",
    "winterfest-demon-hunters",
    "rvb-players-vs-guards",
    "tmnt-city",
    "rvb-squid-minigame",
  ],
};

/** Anchor id used for in-page schema links (code with dashes stripped). */
export function mapAnchor(code: string) {
  return code.replaceAll("-", "");
}

/**
 * Newest `updated` value among the given maps, as an ISO year-month.
 *
 * Hub pages derive their "last updated" line from this instead of carrying a
 * hardcoded string. The old constant said "February 2026" on every hub while
 * the cards below it read "August 2026" and the sitemap sent today's date —
 * three different answers on one page. Deriving it keeps them in agreement
 * and means the line cannot go stale on its own.
 *
 * ISO `YYYY-MM` sorts correctly as a plain string, so no date parsing here.
 */
export function latestUpdated(ids: MapId[]): string | null {
  const sorted = ids.map((id) => MAPS[id].updated).sort();
  return sorted.length ? sorted[sorted.length - 1] : null;
}

export const getMap = (id: MapId) => MAPS[id];
