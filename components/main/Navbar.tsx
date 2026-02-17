"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tmnt-fortnite-maps", label: "TMNT" },
  { href: "/squid-game-fortnite-maps", label: "Squid Game" },
  { href: "/fortnite-gun-game-maps", label: "Gun Games" },
  { href: "/best-fortnite-xp-maps", label: "XP Maps" },
];

const TMNT_SUBLINKS = [
  { href: "/tmnt-mega-ramp-survival", label: "Mega Ramp Survival" },
  { href: "/tmnt-city", label: "TMNT City" },
];

const SQUID_SUBLINKS = [
  { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
  { href: "/tilted-squid-royale-99-bots", label: "Tilted Squid Royale (99 Bots)" },
];

const FEATURED_SUBLINKS = [
  { href: "/winterfest-demon-hunters", label: "Winterfest Demon Hunters" },
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

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  function closeMenu() {
    setOpen(false);
  }

  // ✅ Close on route change (prevents sticky mobile menu)
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ✅ Optional: click outside panel to close (works even without overlay)
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      const target = e.target as Node;
      if (!panel.contains(target)) setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <>
      <header className="w-full fixed top-0 z-50 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md">
        {/* Top row */}
        <div className="h-[65px] px-4 md:px-10">
          <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
            {/* Logo */}
            <Link
              href="/"
              className="h-auto w-auto flex flex-row items-center"
              onClick={closeMenu}
              aria-label="NLDEVS Home"
            >
              <Image
                src="/NavLogo.png"
                alt="NLDEVS Fortnite maps logo"
                width={40}
                height={40}
                className="cursor-pointer hover:animate-slowspin"
                priority
              />
              <span className="font-bold ml-[10px] hidden md:block text-gray-300">
                NLDEVS.
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-8 text-gray-200"
              aria-label="Primary navigation"
            >
              {/* Home */}
              <Link
                href="/"
                aria-current={isActive(pathname, "/") ? "page" : undefined}
                className={`hover:text-white transition-colors ${
                  isActive(pathname, "/") ? "text-white" : ""
                }`}
              >
                Home
              </Link>

              {/* TMNT dropdown */}
              <div className="relative group">
                <Link
                  href="/tmnt-fortnite-maps"
                  aria-current={
                    isActive(pathname, "/tmnt-fortnite-maps") ||
                    TMNT_SUBLINKS.some((s) => isActive(pathname, s.href))
                      ? "page"
                      : undefined
                  }
                  className={`hover:text-white transition-colors ${
                    isActive(pathname, "/tmnt-fortnite-maps") ||
                    TMNT_SUBLINKS.some((s) => isActive(pathname, s.href))
                      ? "text-white"
                      : ""
                  }`}
                >
                  TMNT
                </Link>

                {/* ✅ Opens on hover OR keyboard focus */}
                <div className="pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 transition absolute left-0 top-full mt-3 w-72 rounded-xl border border-[#2A0E61] bg-[#030014cc] backdrop-blur-md shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/tmnt-fortnite-maps"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5"
                    >
                      TMNT Hub
                    </Link>
                    <div className="h-px bg-white/10 my-2" />
                    {TMNT_SUBLINKS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Squid dropdown */}
              <div className="relative group">
                <Link
                  href="/squid-game-fortnite-maps"
                  aria-current={
                    isActive(pathname, "/squid-game-fortnite-maps") ||
                    SQUID_SUBLINKS.some((s) => isActive(pathname, s.href))
                      ? "page"
                      : undefined
                  }
                  className={`hover:text-white transition-colors ${
                    isActive(pathname, "/squid-game-fortnite-maps") ||
                    SQUID_SUBLINKS.some((s) => isActive(pathname, s.href))
                      ? "text-white"
                      : ""
                  }`}
                >
                  Squid Game
                </Link>

                <div className="pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 transition absolute left-0 top-full mt-3 w-80 rounded-xl border border-[#2A0E61] bg-[#030014cc] backdrop-blur-md shadow-lg">
                  <div className="p-2">
                    <Link
                      href="/squid-game-fortnite-maps"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5"
                    >
                      Squid Hub
                    </Link>
                    <div className="h-px bg-white/10 my-2" />
                    {SQUID_SUBLINKS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other top-level */}
              <Link
                href="/fortnite-gun-game-maps"
                aria-current={isActive(pathname, "/fortnite-gun-game-maps") ? "page" : undefined}
                className={`hover:text-white transition-colors ${
                  isActive(pathname, "/fortnite-gun-game-maps") ? "text-white" : ""
                }`}
              >
                Gun Games
              </Link>

              <Link
                href="/best-fortnite-xp-maps"
                aria-current={isActive(pathname, "/best-fortnite-xp-maps") ? "page" : undefined}
                className={`hover:text-white transition-colors ${
                  isActive(pathname, "/best-fortnite-xp-maps") ? "text-white" : ""
                }`}
              >
                XP Maps
              </Link>
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
                aria-controls="mobile-menu"
                // aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
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
        </div>

        {/* Mobile scroll tabs */}
        <nav aria-label="Mobile quick navigation" className="md:hidden border-t border-white/10">
          <div className="px-4 py-2 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className={`shrink-0 rounded-full border border-[#2A0E61] bg-[#0300145e] px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5 transition ${
                    isActive(pathname, l.href) ? "text-white border-cyan-400" : ""
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-[560px]" : "max-h-0"
          }`}
        >
          <div className="mx-4 mb-4 mt-3 rounded-xl border border-[#2A0E61] bg-[#030014cc] backdrop-blur-md">
            <nav className="p-3" aria-label="Mobile menu">
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(pathname, l.href) ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-gray-200 hover:text-white hover:bg-white/5 transition ${
                        isActive(pathname, l.href) ? "text-white bg-white/5" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}

                <li className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">
                    TMNT Details
                  </p>
                  {TMNT_SUBLINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`block rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition ${
                        isActive(pathname, s.href) ? "text-white bg-white/5" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {s.label}
                    </Link>
                  ))}
                </li>

                <li className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">
                    Squid Details
                  </p>
                  {SQUID_SUBLINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`block rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition ${
                        isActive(pathname, s.href) ? "text-white bg-white/5" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {s.label}
                    </Link>
                  ))}
                </li>

                <li className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">
                    Featured
                  </p>
                  {FEATURED_SUBLINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`block rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition ${
                        isActive(pathname, s.href) ? "text-white bg-white/5" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {s.label}
                    </Link>
                  ))}
                </li>
              </ul>

              {/* Mobile socials */}
              <div className="mt-3 border-t border-white/10 pt-3 px-3 pb-2">
                <p className="text-sm text-gray-400 mb-2">Follow NLDEVS</p>
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

      {/* Overlay */}
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
