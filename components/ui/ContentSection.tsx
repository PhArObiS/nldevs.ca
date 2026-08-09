import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id?: string;
  title: string;
  /** Highlighted tail of the title, rendered in the neon gradient. */
  accent?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A titled block on an inner page. Headings centre on phones and align left
 * from `md` up, matching PageHeader.
 */
export default function ContentSection({
  id,
  title,
  accent,
  children,
  className = "",
}: Props) {
  return (
    <Reveal as="section" className={`mt-16 ${className}`}>
      <h2
        id={id}
        className="text-center text-2xl font-bold tracking-tight text-white md:text-left md:text-3xl"
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="neon-text">{accent}</span>
          </>
        )}
      </h2>

      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

/**
 * Bulleted or numbered list that stays left-aligned internally but sits
 * centred on phones, so it reads as centred without ragged bullet columns.
 */
export function CenteredList({
  children,
  ordered = false,
}: {
  children: ReactNode;
  ordered?: boolean;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="flex justify-center md:justify-start">
      <List
        className={`space-y-2.5 text-left leading-relaxed text-gray-400 ${
          ordered ? "list-decimal" : "list-disc"
        } ml-5`}
      >
        {children}
      </List>
    </div>
  );
}
