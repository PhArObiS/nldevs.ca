import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const REASONS = ["1", "2", "3", "4"] as const;

export default function WhyPlayOurMaps() {
  const t = useTranslations("why");

  return (
    <section
      id="why-play"
      aria-labelledby="why-play-title"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <Reveal>
        <SectionHeading
          id="why-play-title"
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => <span className="neon-text">{chunks}</span>,
          })}
          description={t("description")}
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {REASONS.map((n) => (
          <RevealItem key={n} className="h-full">
            <div className="clip-corner group h-full border border-edge/70 bg-ink-800/50 p-7 text-center transition-colors duration-300 hover:border-neon-cyan/50 md:text-left">
              <span
                className="font-mono text-sm font-bold text-neon-violet/70"
                aria-hidden="true"
              >
                {`0${n}`}
              </span>

              <h3 className="mt-3 text-xl font-bold text-white">
                {t(`reason${n}Title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-400">
                {t(`reason${n}Desc`)}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <a href="#featured-fortnite-maps" className="btn-neon clip-corner-sm">
          {t("exploreFeatured")}
        </a>

        <Link href="/best-fortnite-xp-maps" className="btn-ghost clip-corner-sm">
          {t("bestXpMaps")}
        </Link>
      </Reveal>
    </section>
  );
}
