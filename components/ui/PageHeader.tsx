import type { ReactNode } from "react";
import Breadcrumbs from "@/components/main/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/constants/site";

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
 * Centered inner-page header used across map and category pages.
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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
    })),
  };

  return (
    <header className="relative">
      <JsonLd
        id={`breadcrumb-schema-${crumbs.map((c) => c.label).join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        data={breadcrumbSchema}
      />

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
        <div className="flex justify-center">
          <Breadcrumbs items={crumbs} />
        </div>

        <div className="mt-8 text-center">
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
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
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
