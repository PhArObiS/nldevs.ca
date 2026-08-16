"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { SOCIAL_LINKS } from "@/constants/site";

const categoryLinks: { href: AppPathname; labelKey: string }[] = [
  { href: "/star-wars-fortnite-maps", labelKey: "starWarsMaps" },
  { href: "/tmnt-fortnite-maps", labelKey: "tmntMaps" },
  { href: "/squid-game-fortnite-maps", labelKey: "squidGameMaps" },
  { href: "/fortnite-gun-game-maps", labelKey: "gunGameMaps" },
  { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
];

const AboutContent = () => {
  const t = useTranslations("about");
  const tc = useTranslations("common");
  const tf = useTranslations("footer");

  return (
    <section
      id="about-us"
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          variants={slideInFromLeft(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center md:text-left"
        >
          {/* The neon rule only reads correctly against a left edge */}
          <p className="eyebrow md:rule-neon">{t("eyebrow")}</p>

          <h2
            id="about-title"
            className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            {t.rich("title", {
              accent: (chunks) => <span className="neon-text">{chunks}</span>,
            })}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            {t("lead")}
          </p>

          <p className="mt-4 leading-relaxed text-gray-400">{t("body")}</p>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("browseByCategory")}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2.5 md:justify-start">
              {categoryLinks.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="clip-corner-sm border border-edge-bright/70 bg-ink-800/60 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan hover:text-white"
                >
                  {tf(c.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <a
              href={SOCIAL_LINKS.fortnite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon clip-corner-sm"
            >
              {tc("followFortnite")}
            </a>
          </div>
        </motion.div>

        {/* Logo panel */}
        <motion.div
          variants={slideInFromRight(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(3,0,20,0) 70%)",
            }}
            aria-hidden="true"
          />

          <div className="clip-corner relative border border-edge/70 bg-ink-800/40 p-8">
            <div className="relative aspect-square w-full">
              <Image
                src="/FortniteCreativeTeamLogo.png"
                alt={t("logoAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContent;
