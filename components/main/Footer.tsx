import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Socials } from "@/constants";
import { SITE_NAME } from "@/constants/site";

const footerNav = [
  {
    heading: "Maps",
    links: [
      { href: "/star-wars-fortnite-maps", label: "Star Wars Maps" },
      { href: "/tmnt-fortnite-maps", label: "TMNT Maps" },
      { href: "/squid-game-fortnite-maps", label: "Squid Game Maps" },
      { href: "/fortnite-gun-game-maps", label: "Gun Game Maps" },
      { href: "/best-fortnite-xp-maps", label: "XP Maps" },
    ],
  },
  {
    heading: "Featured",
    links: [
      { href: "/tmnt-mega-ramp-survival", label: "TMNT Mega Ramp Survival" },
      { href: "/tmnt-city", label: "TMNT City" },
      { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
      { href: "/winterfest-demon-hunters", label: "Winterfest Demon Hunters" },
    ],
  },
];

const Footer: React.FC = () => (
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
            A UEFN game studio building replayable Fortnite experiences — gun games,
            themed adventures, and progression maps.
          </p>

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
        </div>

        {/* Nav columns */}
        {footerNav.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="eyebrow">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Epic Games.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
