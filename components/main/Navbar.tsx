import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Logo (internal link) */}
        <Link href="/" className="h-auto w-auto flex flex-row items-center">
          <Image
            src="/NavLogo.png"
            alt="NLDevs Fortnite maps logo"
            width={40}
            height={40}
            className="cursor-pointer hover:animate-slowspin"
            priority
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            NLDevs.
          </span>
        </Link>

        {/* Internal nav (SEO + crawl paths) */}
        <nav
          className="hidden md:flex items-center gap-8 text-gray-200"
          aria-label="Primary navigation"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>

          <Link href="/best-fortnite-xp-maps" className="hover:text-white transition-colors">
            XP Maps
          </Link>

          <Link href="/tmnt-fortnite-maps" className="hover:text-white transition-colors">
            TMNT
          </Link>

          <Link href="/fortnite-gun-game-maps" className="hover:text-white transition-colors">
            Gun Games
          </Link>

          <Link href="/squid-game-fortnite-maps" className="hover:text-white transition-colors">
            Squid Game
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex flex-row gap-2 items-center">
          {Socials.map((social) => {
            const href =
              social.name === "Fortnite"
                ? "https://www.fortnite.com/@nldevs"
                : social.name === "Discord"
                ? "https://discord.gg/V2MEqa69"
                : social.name === "Youtube"
                ? "https://www.youtube.com/@nldevs"
                : social.name === "Gmail"
                ? "mailto:nldevsmtl@gmail.com"
                : social.name === "X"
                ? "https://x.com/nldevsmtl"
                : "#";

            const isExternal =
              href.startsWith("http://") ||
              href.startsWith("https://") ||
              href.startsWith("mailto:");

            return (
              <a
                key={social.name}
                href={href}
                aria-label={social.name}
                title={social.name}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex"
              >
                <Image
                  src={social.src}
                  alt={`${social.name} link`}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
