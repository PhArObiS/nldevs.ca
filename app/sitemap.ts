import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

/**
 * Every route below must correspond to a real page in `app/`.
 * Adding a page? Add it here too — anything listed but missing is served
 * to crawlers as a 404.
 */
const HUB_ROUTES = [
  "/star-wars-fortnite-maps",
  "/tmnt-fortnite-maps",
  "/squid-game-fortnite-maps",
  "/fortnite-gun-game-maps",
  "/best-fortnite-xp-maps",
  "/playtest-squad",
  "/uefn-contracts",
  "/privacy",
];

const MAP_ROUTES = [
  "/star-wars-tycoon-sidekick-legends",
  "/star-wars-mega-rvb",
  "/star-wars-tilted-99-bots-royale",
  "/tmnt-mega-ramp-survival",
  "/tmnt-city",
  "/rvb-squid-minigame",
  "/99-bots-squid-royale-boss",
  "/sidekick-siege-99-bots",
  "/winterfest-demon-hunters",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...HUB_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...MAP_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
