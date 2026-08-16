import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /**
   * Run on page routes only.
   *
   * Excluded, and why:
   *  - `api`        — JSON endpoints, no locale negotiation.
   *  - `_next` / `_vercel` — framework internals.
   *  - anything with a dot — static assets plus the SEO files that must stay
   *    at fixed paths (`/robots.txt`, `/sitemap.xml`, `/image-sitemap.xml`).
   *  - `opengraph-image` — Next builds these at `/en/opengraph-image` etc.
   *    and points `og:image` straight at that path. Letting the middleware
   *    strip the `/en` prefix made the English card a 307, and social
   *    crawlers are not guaranteed to follow a redirect on og:image.
   *
   * `/admin` is deliberately NOT excluded: it lives under [locale] so the app
   * keeps one root layout, and therefore still needs locale resolution.
   */
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
