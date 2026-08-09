import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  /** Highlighted tail of the title, rendered in the neon gradient. */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

/**
 * One heading treatment for every section, so the page reads as a system
 * rather than a stack of separately-styled blocks.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  id,
}: Props) {
  const centered = align === "center";

  return (
    <header
      className={
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
      }
    >
      {eyebrow && (
        <p className={`eyebrow ${centered ? "" : "rule-neon"}`}>{eyebrow}</p>
      )}

      <h2
        id={id}
        className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
      >
        {title}
        {accent && <> <span className="neon-text">{accent}</span></>}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-gray-400 md:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
