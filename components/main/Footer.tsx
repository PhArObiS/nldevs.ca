import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { Socials } from "@/constants";
import { SOCIAL_LINKS } from "@/constants/site";

type FooterColumn = {
  /** Key under the `footer` namespace. */
  headingKey: string;
  links: { href: AppPathname; labelKey?: string; label?: string }[];
};

const footerNav: FooterColumn[] = [
  {
    headingKey: "maps",
    links: [
      { href: "/star-wars-fortnite-maps", labelKey: "starWarsMaps" },
      { href: "/tmnt-fortnite-maps", labelKey: "tmntMaps" },
      { href: "/squid-game-fortnite-maps", labelKey: "squidGameMaps" },
      { href: "/fortnite-gun-game-maps", labelKey: "gunGameMaps" },
      { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
    ],
  },
  {
    // Map titles are in-game island names and stay untranslated.
    headingKey: "featured",
    links: [
      {
        href: "/star-wars-tycoon-sidekick-legends",
        label: "Star Wars Tycoon Sidekick Legends",
      },
      { href: "/star-wars-mega-rvb", label: "Star Wars Mega RvB" },
      { href: "/tmnt-mega-ramp-survival", label: "TMNT Mega Ramp Survival" },
      { href: "/tmnt-city", label: "TMNT City" },
      {
        href: "/99-bots-squid-royale-boss",
        label: "99 Bots Squid Royale Boss",
      },
      { href: "/sidekick-siege-99-bots", label: "Sidekick Siege 99 Bots" },
      { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
      { href: "/winterfest-demon-hunters", label: "Winterfest Demon Hunters" },
    ],
  },
];

const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="relative w-full border-t border-edge/60 bg-ink-800/40">
      {/* Neon hairline across the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-violet/60 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/NavLogo.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
              />
              <span className="text-lg font-bold text-white">NLDEVS</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>

            <a
              href={SOCIAL_LINKS.fortnite}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-corner-sm mt-5 inline-flex border border-neon-cyan bg-neon-cyan px-4 py-2 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-white"
            >
              {tc("followFortnite")}
            </a>

            <div className="mt-6 flex flex-row items-center gap-3">
              {Socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-corner-sm inline-flex border border-edge p-2.5 opacity-80 transition hover:border-neon-cyan hover:opacity-100"
                >
                  <Image
                    src={social.src}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                  />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <nav key={col.headingKey} aria-label={t(col.headingKey)}>
              <h2 className="eyebrow">{t(col.headingKey)}</h2>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-400 transition hover:text-white"
                    >
                      {l.labelKey ? t(l.labelKey) : l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/uefn-contracts" className="transition hover:text-white">
              {t("uefnContracts")}
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              {t("privacy")}
            </Link>
            <a
              href="mailto:nldevsmtl@gmail.com"
              className="transition hover:text-white"
            >
              {t("contact")}
            </a>
          </div>
          {/* Passed as a string: ICU would otherwise group the digits and
              render "2 026" under fr. */}
          <p>{t("copyright", { year: String(new Date().getFullYear()) })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
