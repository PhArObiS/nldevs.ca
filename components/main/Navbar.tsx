"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/best-fortnite-xp-maps", label: "XP Maps" },
  { href: "/tmnt-fortnite-maps", label: "TMNT" },
  { href: "/fortnite-gun-game-maps", label: "Gun Games" },
  { href: "/squid-game-fortnite-maps", label: "Squid Game" },
];

function getSocialHref(name: string) {
  return name === "Fortnite"
    ? "https://www.fortnite.com/@nldevs"
    : name === "Discord"
    ? "https://discord.gg/V2MEqa69"
    : name === "Youtube"
    ? "https://www.youtube.com/@nldevs"
    : name === "Gmail"
    ? "mailto:nldevsmtl@gmail.com"
    : name === "X"
    ? "https://x.com/nldevsmtl"
    : "#";
}

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when menu open (mobile)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
          {/* Logo */}
          <Link
            href="/"
            className="h-auto w-auto flex flex-row items-center"
            onClick={closeMenu}
          >
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

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8 text-gray-200"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side: socials + mobile hamburger */}
          <div className="flex flex-row gap-3 items-center">
            {/* Socials */}
            <div className="hidden sm:flex flex-row gap-2 items-center">
              {Socials.map((social) => {
                const href = getSocialHref(social.name);
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
                    className="inline-flex opacity-90 hover:opacity-100 transition-opacity"
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

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-[#2A0E61] bg-[#0300145e] px-3 py-2 text-gray-200 hover:text-white transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              // aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {/* Icon */}
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-200 ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-full bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full bg-current transition-transform duration-200 ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu panel (slide-down) */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-[420px]" : "max-h-0"
          }`}
        >
          <div className="mx-4 mb-4 mt-3 rounded-xl border border-[#2A0E61] bg-[#030014cc] backdrop-blur-md">
            <nav className="p-3" aria-label="Mobile navigation">
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block rounded-lg px-3 py-3 text-gray-200 hover:text-white hover:bg-white/5 transition"
                      onClick={closeMenu}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile socials */}
              <div className="mt-2 border-t border-white/10 pt-3 px-3 pb-2">
                <p className="text-sm text-gray-400 mb-2">Follow NLDevs</p>
                <div className="flex flex-row gap-3 items-center">
                  {Socials.map((social) => {
                    const href = getSocialHref(social.name);
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
                        className="inline-flex opacity-90 hover:opacity-100 transition-opacity"
                        onClick={closeMenu}
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
            </nav>
          </div>
        </div>
      </header>

      {/* Overlay (tap to close) */}
      {open ? (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
