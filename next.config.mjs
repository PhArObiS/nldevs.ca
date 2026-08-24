import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Permanent moves from before the current URL scheme. These run ahead of the
   * i18n middleware, so they resolve without picking up a locale prefix.
   *
   * Without them the old URLs 404 and any links they earned are discarded —
   * Search Console was reporting them under "Not found (404)".
   */
  async redirects() {
    return [
      // Renamed when the Star Wars set landed. Same map, same island code
      // (1116-7765-9076), so the old path should carry over rather than die.
      {
        source: "/tilted-squid-royale-99-bots",
        destination: "/star-wars-tilted-99-bots-royale",
        permanent: true,
      },
      // Early collection page. Its own JSON-LD already pointed at the root,
      // and its role is now split between the homepage and the category hubs.
      {
        source: "/Maps",
        destination: "/",
        permanent: true,
      },
      // Winterfest Demon Hunters was renamed to KPop Demon Hunters on Epic —
      // same island code (6101-7751-8665), new theme. Every locale had its own
      // winterfest slug, so each needs its own redirect. The English path is
      // unprefixed; the rest keep their locale prefix so the visitor stays in
      // their language.
      ...[
        ["", "/winterfest-demon-hunters"],
        ["/fr", "/fete-hivernale-chasseurs-de-demons"],
        ["/pt", "/festa-invernal-cacadores-de-demonios"],
        ["/es", "/fiesta-invernal-cazadores-de-demonios"],
        ["/ru", "/zimniy-festival-ohotniki-na-demonov"],
        ["/pl", "/winterfest-lowcy-demonow"],
        ["/de", "/winterfest-daemonenjaeger"],
        ["/ja", "/winterfest-demon-hunters"],
      ].map(([prefix, oldPath]) => ({
        source: `${prefix}${oldPath}`,
        destination: `${prefix}/kpop-demon-hunters`,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
