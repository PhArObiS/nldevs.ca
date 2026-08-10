"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  title: string;
  /** Fortnite island code, e.g. "0556-7584-6565" */
  code: string;
  mode?: string;
  /** When provided, the whole card becomes a link to the detail page. */
  href?: string;
  /** Cards above the fold should render eagerly for a better LCP. */
  priority?: boolean;
  /** Optional blurb shown under the title (used by the hub pages). */
  notes?: string;
  status?: string;
  updated?: string;
}

function getStatusClass(status?: string) {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("live")) {
    return "border-emerald-400/50 bg-emerald-400/15 text-emerald-300";
  }

  if (value.includes("playtest") || value.includes("testing")) {
    return "border-neon-magenta/50 bg-neon-magenta/15 text-neon-magenta";
  }

  if (value.includes("coming")) {
    return "border-amber-300/50 bg-amber-300/15 text-amber-200";
  }

  return "border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan";
}

function getStatusLabel(status?: string) {
  if (!status) return "";
  return status.toLowerCase() === "testing" ? "Playtest" : status;
}

const FortniteMapsCard = ({
  src,
  title,
  code,
  mode,
  href,
  priority,
  notes,
  status,
  updated,
}: Props) => {
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
      // visible on the card either way, so fail quietly.
    }
  }, [code]);

  return (
    <article className="group relative">
      {/* Neon edge that fades in on hover. Sits behind the card body. */}
      <div
        className="clip-corner absolute -inset-px bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-magenta opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        aria-hidden="true"
      />

      <div className="clip-corner relative flex h-full flex-col bg-ink-800 transition-transform duration-300 group-hover:-translate-y-1">
        {/* Fixed 16:9 frame keeps every card the same height regardless of
            the source image's aspect ratio. */}
        <div className="relative aspect-video w-full overflow-hidden bg-ink-700">
          <Image
            src={src}
            alt={`${title} Fortnite map gameplay preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            priority={priority}
          />

          {/* Darkens the top for badge legibility, base blends into the card */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-ink/75 via-transparent to-ink-800"
            aria-hidden="true"
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {mode && (
              <span className="clip-corner-sm border border-neon-cyan/40 bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neon-cyan backdrop-blur-sm">
                {mode}
              </span>
            )}
            {status && (
              <span
                className={`clip-corner-sm border px-2.5 py-1 text-[11px] font-black uppercase tracking-wider backdrop-blur-sm ${getStatusClass(status)}`}
              >
                {getStatusLabel(status)}
              </span>
            )}
            {updated && (
              <span className="clip-corner-sm border border-neon-cyan/40 bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neon-cyan backdrop-blur-sm">
                Updated
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-white">
            {href ? (
              // Stretched link: makes the entire card clickable without
              // nesting the copy button inside an anchor.
              <Link
                href={href}
                className="transition-colors after:absolute after:inset-0 group-hover:text-neon-cyan"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>

          {notes && (
            <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
              {notes}
            </p>
          )}

          {updated && (
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Updated {updated}
            </p>
          )}

          <div className="mt-auto pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Island code
            </p>

            <div className="mt-1.5 flex items-center justify-between gap-3">
              <p className="font-mono text-base tracking-tight text-gray-200">
                {code}
              </p>

              {/* z-10 lifts the button above the stretched-link overlay */}
              <button
                type="button"
                onClick={copyCode}
                aria-label={`Copy island code for ${title}`}
                className={`clip-corner-sm relative z-10 shrink-0 border px-3 py-1.5 text-xs font-semibold transition ${
                  copied
                    ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                    : "border-edge-bright text-gray-300 hover:border-neon-cyan hover:text-white"
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Announce the copy result to assistive tech */}
          <span aria-live="polite" className="sr-only">
            {copied ? `Island code ${code} copied to clipboard` : ""}
          </span>
        </div>
      </div>
    </article>
  );
};

export default FortniteMapsCard;
