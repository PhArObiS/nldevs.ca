/** Canonical origin for the site. Single source of truth — every page,
 *  sitemap entry, and JSON-LD block should import this rather than
 *  re-declaring the literal. */
export const SITE_URL = "https://www.nldevs.ca";

export const SITE_NAME = "NLDEVS";

export const SITE_LOGO_PATH = "/NavLogo.png";
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;

export const SOCIAL_LINKS = {
  fortnite: "https://www.fortnite.com/@nldevs",
  youtube: "https://www.youtube.com/@nldevs",
  x: "https://x.com/nldevsmtl",
  discord: "https://discord.gg/V2MEqa69",
  email: "mailto:nldevsmtl@gmail.com",
} as const;

/** Used for JSON-LD `sameAs` and footer/nav social rows. */
export const SAME_AS = [
  SOCIAL_LINKS.fortnite,
  SOCIAL_LINKS.youtube,
  SOCIAL_LINKS.x,
  SOCIAL_LINKS.discord,
];
