import type { NextRequest } from "next/server";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "./routing";

/**
 * Resolves which language to answer an API request in.
 *
 * Route handlers sit outside the `[locale]` segment, so there is no segment
 * value to read. Resolution order:
 *  1. An explicit `locale` in the request body — the client knows its own
 *     locale via useLocale() and sends it.
 *  2. The `NEXT_LOCALE` cookie that the i18n middleware sets.
 *  3. `Accept-Language`, for non-browser or first-touch callers.
 *  4. English.
 */
export function resolveApiLocale(
  request: NextRequest,
  bodyLocale?: unknown
): Locale {
  if (hasLocale(routing.locales, bodyLocale)) return bodyLocale;

  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (hasLocale(routing.locales, cookie)) return cookie;

  // Take the primary subtag of the first entry: "pt-BR,pt;q=0.9" -> "pt".
  const header = request.headers.get("accept-language");
  const primary = header?.split(",")[0]?.trim().split("-")[0]?.toLowerCase();
  if (hasLocale(routing.locales, primary)) return primary;

  return routing.defaultLocale;
}

/** Translator for the `api` namespace in the resolved language. */
export function getApiTranslations(locale: Locale) {
  return getTranslations({ locale, namespace: "api" });
}
