import type { ReactNode } from "react";
import Breadcrumbs from "@/components/main/Breadcrumbs";

type Crumb = { href?: string; label: string };

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  /** Highlighted tail of the title, rendered in the neon gradient. */
  accent?: string;
  description?: ReactNode;
  lastUpdated?: string;
  children?: ReactNode;
};

/**
 * Standard header for every inner page: breadcrumbs, eyebrow, h1, blurb.
 *
 * Centred on phones and left-aligned from `md` up — narrow screens read
 * better with the header centred, while wide screens want a left edge to
 * anchor against.
 */
export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  accent,
  description,
  lastUpdated,
  children,
}: Props) {
  return (
    <header className="relative">
      {/* Neon glow behind the title */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl md:left-0 md:translate-x-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(3,0,20,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex justify-center md:justify-start">
          <Breadcrumbs items={crumbs} />
        </div>

        <div className="mt-8 text-center md:text-left">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {title}
            {accent && (
              <>
                {" "}
                <span className="neon-text">{accent}</span>
              </>
            )}
          </h1>

          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-400 md:mx-0">
              {description}
            </p>
          )}

          {lastUpdated && (
            <p className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}

          {children}
        </div>
      </div>
    </header>
  );
}
