import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // The public site uses www as its canonical host. The HTML already declares
  // that canonical, but serving the apex host with a 200 leaves Google to
  // consolidate two copies. Redirect it before locale routing instead.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const requestHost = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = requestHost.split(":", 1)[0].toLowerCase();

  if (hostname === "nldevs.ca") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = "www.nldevs.ca";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return intlMiddleware(request);
}

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
