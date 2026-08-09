import type { ReactNode } from "react";
import Link from "next/link";
import { RevealGroup, RevealItem } from "./Reveal";

/** Bordered panel used for FAQ entries and short content blocks. */
export function InfoCard({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="clip-corner border border-edge/70 bg-ink-800/50 p-6 text-center transition-colors duration-300 hover:border-neon-cyan/50">
      <h3 className="font-bold text-white">{heading}</h3>
      <p className="mt-2.5 leading-relaxed text-gray-400">{children}</p>
    </div>
  );
}

/** Stack of InfoCards that reveal in sequence. */
export function FaqList({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  return (
    <RevealGroup className="grid gap-4">
      {items.map((f) => (
        <RevealItem key={f.q}>
          <InfoCard heading={f.q}>{f.a}</InfoCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Row of pill links for "similar maps" and "related pages". */
export function PillLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="clip-corner-sm border border-edge-bright/70 bg-ink-800/60 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/** "Back to top" affordance at the foot of an inner page. */
export function BackToTop() {
  return (
    <div className="mt-16 flex justify-center">
      <a
        href="#top"
        className="text-sm text-gray-500 transition hover:text-neon-cyan"
      >
        Back to top ↑
      </a>
    </div>
  );
}
