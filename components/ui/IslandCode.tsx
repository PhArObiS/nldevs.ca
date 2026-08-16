"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * The prominent island-code panel at the top of a map detail page.
 * Client component because it writes to the clipboard.
 */
export default function IslandCode({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). The code is
      // on screen either way, so fail quietly.
    }
  }, [code]);

  return (
    <div className="clip-corner relative mt-8 overflow-hidden border border-edge/70 bg-ink-800/60 p-6 md:p-8">
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center justify-center gap-5 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {t("islandCode")}
          </p>
          <p className="mt-2 font-mono text-2xl tracking-tight text-white md:text-3xl">
            {code}
          </p>
        </div>

        <button
          type="button"
          onClick={copyCode}
          aria-label={t("copyAria", { title })}
          className={`btn-neon clip-corner-sm shrink-0 ${
            copied ? "brightness-110" : ""
          }`}
        >
          {copied ? t("copied") : t("copyCode")}
        </button>
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? t("copiedAnnounce", { code }) : ""}
      </span>
    </div>
  );
}
