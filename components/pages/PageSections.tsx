import type { ReactNode } from "react";
import ContentSection, { CenteredList } from "@/components/ui/ContentSection";
import { InfoCard } from "@/components/ui/InfoCard";

/**
 * Minimal shape of the translator functions used below — enough to read
 * structured values without importing next-intl's full generic surface.
 */
type RawReader = {
  has: (key: string) => boolean;
  raw: (key: string) => unknown;
};

/**
 * Safe readers for structured catalog values.
 *
 * `t.raw()` does NOT return undefined for a missing key — it reports the
 * error and hands back the fallback *string*, so a plain `?? []` still
 * yields a string and blows up on `.map`. Checking `has()` first and then
 * verifying the shape makes a missing or half-translated namespace render as
 * empty instead of crashing the page.
 */
export function rawArray<T>(t: RawReader, key: string): T[] {
  if (!t.has(key)) return [];
  const value = t.raw(key);
  return Array.isArray(value) ? (value as T[]) : [];
}

export function rawRecord(t: RawReader, key: string): Record<string, string> {
  if (!t.has(key)) return {};
  const value = t.raw(key);
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, string>)
    : {};
}

/**
 * Body sections declared as data rather than JSX.
 *
 * The map and hub pages are structurally similar but not identical — some
 * open with prose, some with a feature list, one leads with a callout card.
 * Encoding the shape in the message catalog keeps that per-page variation
 * while making every string translatable, instead of forcing all pages into
 * one rigid template.
 */
export type PageSection =
  | { type: "prose"; title: string; accent?: string; paragraphs: string[]; id?: string }
  | { type: "list"; title: string; accent?: string; items: string[]; id?: string }
  | {
      type: "orderedList";
      title: string;
      accent?: string;
      items: string[];
      id?: string;
    }
  | {
      type: "card";
      title: string;
      accent?: string;
      heading: string;
      body: string;
      id?: string;
    };

export function renderSection(section: PageSection, key: string): ReactNode {
  const common = { id: section.id, title: section.title, accent: section.accent };

  switch (section.type) {
    case "prose":
      return (
        <ContentSection key={key} {...common}>
          <div className="space-y-4 text-center leading-relaxed text-gray-400 md:text-left">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ContentSection>
      );

    case "list":
      return (
        <ContentSection key={key} {...common}>
          <CenteredList>
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </CenteredList>
        </ContentSection>
      );

    case "orderedList":
      return (
        <ContentSection key={key} {...common}>
          <CenteredList ordered>
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </CenteredList>
        </ContentSection>
      );

    case "card":
      return (
        <ContentSection key={key} {...common}>
          <InfoCard heading={section.heading}>{section.body}</InfoCard>
        </ContentSection>
      );
  }
}

export function PageSections({ sections }: { sections: PageSection[] }) {
  return <>{sections.map((s, i) => renderSection(s, `section-${i}`))}</>;
}
