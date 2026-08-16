"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_META, locales, type Locale } from "@/i18n/routing";

/**
 * Switches locale while staying on the equivalent page.
 *
 * `usePathname` here is the locale-aware one, so it returns the canonical
 * (English-keyed) route regardless of which localized slug is in the address
 * bar. Pushing that same route under a new locale makes the router emit the
 * target language's slug — /pt/cidade-tartarugas-ninja becomes
 * /es/ciudad-tortugas-ninja rather than a 404.
 */
export default function LanguageSwitcher({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    onNavigate?.();
    if (next === locale) return;

    startTransition(() => {
      // `params` carries any dynamic segments the route needs; spreading it
      // keeps this generic if dynamic routes are added later.
      router.replace(
        // @ts-expect-error -- pathname is a validated route at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  // Mobile renders a flat row of buttons inside the open menu panel — a
  // dropdown inside a dropdown is awkward on touch.
  if (variant === "mobile") {
    return (
      <div className="px-3 pb-2 pt-3">
        <p className="mb-3 text-xs uppercase tracking-wider text-gray-500">
          {t("language")}
        </p>
        <div className="flex flex-wrap gap-2">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              aria-current={l === locale ? "true" : undefined}
              lang={LOCALE_META[l].htmlLang}
              className={`clip-corner-sm border px-3 py-2 text-sm font-semibold transition ${
                l === locale
                  ? "border-neon-cyan bg-neon-cyan/10 text-white"
                  : "border-edge bg-ink-800/60 text-gray-400 hover:border-neon-cyan hover:text-white"
              }`}
            >
              {LOCALE_META[l].label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("changeLanguage")}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={isPending}
        className="clip-corner-sm inline-flex items-center gap-1.5 border border-edge-bright bg-ink-800/70 px-2.5 py-2 text-sm font-semibold text-gray-300 transition hover:border-neon-cyan hover:text-white disabled:opacity-60"
      >
        <GlobeAltIcon className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("language")}
          className="clip-corner absolute right-0 top-full z-50 mt-2 w-40 border border-edge bg-ink/95 p-1.5 backdrop-blur-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                lang={LOCALE_META[l].htmlLang}
                onClick={() => switchTo(l)}
                className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-white/5 ${
                  l === locale ? "text-neon-cyan" : "text-gray-300 hover:text-white"
                }`}
              >
                {LOCALE_META[l].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
