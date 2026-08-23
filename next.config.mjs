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
    ];
  },
};

export default withNextIntl(nextConfig);
