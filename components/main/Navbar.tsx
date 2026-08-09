"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  /** Renders a hover/focus dropdown on desktop and a labelled group on mobile. */
  children?: { href: string; label: string }[];
};

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/star-wars-fortnite-maps",
    label: "Star Wars",
    children: [
      {
        href: "/star-wars-tycoon-sidekick-legends",
        label: "Star Wars Tycoon",
      },
      { href: "/star-wars-mega-rvb", label: "Mega RvB" },
      {
        href: "/star-wars-tilted-99-bots-royale",
        label: "Tilted 99 Bots Royale",
      },
    ],
  },
  {
    href: "/tmnt-fortnite-maps",
    label: "TMNT",
    children: [
      { href: "/tmnt-mega-ramp-survival", label: "Mega Ramp Survival" },
      { href: "/tmnt-city", label: "TMNT City" },
    ],
  },
  {
    href: "/squid-game-fortnite-maps",
    label: "Squid Game",
    children: [
      { href: "/rvb-squid-minigame", label: "RvB Squid Minigame" },
      { href: "/99-bots-squid-royale-boss", label: "99 Bots Squid Royale Boss" },
      { href: "/sidekick-siege-99-bots", label: "Sidekick Siege 99 Bots" },
    ],
  },
  { href: "/fortnite-gun-game-maps", label: "Gun Games" },
  { href: "/best-fortnite-xp-maps", label: "XP Maps" },
];

const FEATURED_SUBLINKS = [
  {
    href: "/star-wars-tycoon-sidekick-legends",
    label: "Star Wars Tycoon Sidekick Legends",
  },
  { href: "/winterfest-demon-hunters", label: "Winterfest Demon Hunters" },
];

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** An item counts as active if it or any of its children matches. */
function isBranchActive(pathname: string, item: NavItem) {
  return (
    isActive(pathname, item.href) ||
    (item.children?.some((c) => isActive(pathname, c.href)) ?? false)
  );
}

function openClientLogin() {
  window.dispatchEvent(new Event("nldevs:open-client-login"));
}

function logoutClient() {
  window.localStorage.removeItem(CLIENT_PROFILE_STORAGE_KEY);
  window.sessionStorage.removeItem("nldevs-client-login-dismissed");
  window.dispatchEvent(new Event("nldevs:client-logout"));
}

const CLIENT_PROFILE_STORAGE_KEY = "nldevs-client-profile";

type ClientProfileSummary = {
  name?: string;
  email?: string;
};

function getStoredClientProfile() {
  try {
    const value = window.localStorage.getItem(CLIENT_PROFILE_STORAGE_KEY);
    if (!value) return null;
    return JSON.parse(value) as ClientProfileSummary;
  } catch {
    window.localStorage.removeItem(CLIENT_PROFILE_STORAGE_KEY);
    return null;
  }
}

function getFirstName(name?: string) {
  return name?.trim().split(/\s+/)[0] || "Player";
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clientProfile, setClientProfile] =
    useState<ClientProfileSummary | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    setOpen((current) => !current);
  }

  function handleMenuButtonPointerDown(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  }

  function handleMenuButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toggleMenu();
  }

  // Solidify the header once the page has moved, so the hero can sit under a
  // near-transparent bar without the nav becoming unreadable further down.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setClientProfile(getStoredClientProfile());

    function onClientLoginUpdated(event: Event) {
      const customEvent = event as CustomEvent<ClientProfileSummary>;
      setClientProfile(customEvent.detail ?? getStoredClientProfile());
    }

    function onStorage() {
      setClientProfile(getStoredClientProfile());
    }

    function onClientLogout() {
      setClientProfile(null);
    }

    window.addEventListener(
      "nldevs:client-login-updated",
      onClientLoginUpdated
    );
    window.addEventListener("nldevs:client-logout", onClientLogout);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(
        "nldevs:client-login-updated",
        onClientLoginUpdated
      );
      window.removeEventListener("nldevs:client-logout", onClientLogout);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Close on route change (prevents a sticky mobile menu)
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Click outside the panel closes it
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      const panel = panelRef.current;
      const menuButton = menuButtonRef.current;
      const target = e.target as Node;
      if (panel?.contains(target) || menuButton?.contains(target)) return;
      setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-edge/70 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-ink/40 backdrop-blur-md"
        }`}
      >
        {/* Top row */}
        <div className="h-[65px] px-4 md:px-8">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex flex-row items-center gap-2.5"
              onClick={closeMenu}
              aria-label="NLDEVS Home"
            >
              <Image
                src="/NavLogo.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="transition-transform duration-500 group-hover:rotate-[18deg]"
                priority
              />
              <span className="hidden text-lg font-extrabold tracking-tight text-white md:block">
                NLDEVS
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary navigation"
            >
              {NAV.map((item) => {
                const active = isBranchActive(pathname, item);

                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {item.label}

                      {/* Neon underline: solid when active, on hover otherwise */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-px h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta transition-transform duration-300 ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    {item.children && (
                      <div className="pointer-events-none absolute left-0 top-full w-72 translate-y-1 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <div className="clip-corner border border-edge bg-ink/95 p-2 backdrop-blur-xl">
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                          >
                            {item.label} Hub
                          </Link>

                          <div className="my-2 h-px bg-white/10" />

                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="block px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right side: socials + mobile hamburger */}
            <div className="flex flex-row items-center gap-3">
              <div className="hidden items-center gap-2 lg:flex">
                <button
                  type="button"
                  onClick={openClientLogin}
                  className={`clip-corner-sm border px-3 py-2 text-sm font-semibold transition ${
                    clientProfile
                      ? "border-neon-cyan bg-neon-cyan text-ink hover:bg-white"
                      : "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan hover:text-ink"
                  }`}
                >
                  {clientProfile ? `Hi, ${getFirstName(clientProfile.name)}` : "Login"}
                </button>

                {clientProfile && (
                  <button
                    type="button"
                    onClick={logoutClient}
                    className="clip-corner-sm border border-edge-bright bg-ink-800/70 px-3 py-2 text-sm font-semibold text-gray-300 transition hover:border-neon-magenta hover:text-white"
                  >
                    Logout
                  </button>
                )}
              </div>

              <div className="hidden flex-row items-center gap-1.5 sm:flex">
                {Socials.map((social) => {
                  const external = isExternalHref(social.href);

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      title={social.name}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex p-1.5 opacity-70 transition hover:opacity-100"
                    >
                      <Image
                        src={social.src}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                      />
                    </a>
                  );
                })}
              </div>

              {/* Mobile hamburger */}
              <div
                className={`clip-corner-sm inline-flex items-center border transition md:hidden ${
                  clientProfile
                    ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan shadow-[0_0_22px_rgba(34,211,238,0.35)]"
                    : "border-edge-bright bg-ink-800/70 text-gray-200"
                }`}
              >
                <button
                  type="button"
                  className="min-h-11 touch-manipulation px-2.5 text-xs font-bold uppercase tracking-wide text-current transition hover:text-white"
                  aria-label={clientProfile ? "Open member menu" : "Open login menu"}
                  aria-controls="mobile-menu"
                  aria-expanded={open}
                  onPointerDown={handleMenuButtonPointerDown}
                  onClick={handleMenuButtonClick}
                >
                  {clientProfile ? `Hi, ${getFirstName(clientProfile.name)}` : "Login"}
                </button>

                <button
                  ref={menuButtonRef}
                  type="button"
                  className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center border-l border-current/25 px-3 py-2 text-current transition hover:bg-neon-cyan hover:text-ink"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-controls="mobile-menu"
                  aria-expanded={open}
                  onPointerDown={handleMenuButtonPointerDown}
                  onClick={handleMenuButtonClick}
                >
                  <span className="relative block h-4 w-5" aria-hidden="true">
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
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-current transition-transform duration-200 ${
                        open ? "-translate-y-[7px] -rotate-45" : ""
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile quick-nav tab strip */}
        <nav
          aria-label="Mobile quick navigation"
          className="border-t border-white/5 md:hidden"
        >
          <div className="scrollbar-none w-full max-w-full overflow-x-auto px-4 py-2">
            <div className="flex items-center gap-2">
              {NAV.map((item) => {
                const active = isBranchActive(pathname, item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`clip-corner-sm shrink-0 border px-3.5 py-1.5 text-sm transition ${
                      active
                        ? "border-neon-cyan bg-neon-cyan/10 text-white"
                        : "border-edge bg-ink-800/60 text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={`md:hidden ${
            open
              ? "max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
              : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="clip-corner mx-4 mb-4 mt-3 border border-edge bg-ink/95 backdrop-blur-xl">
            <nav className="p-3" aria-label="Mobile menu">
              <ul className="flex flex-col">
                <li className="mb-2 border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      openClientLogin();
                      closeMenu();
                    }}
                    className={`clip-corner-sm mx-3 my-2 w-[calc(100%-1.5rem)] border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      clientProfile
                        ? "border-neon-cyan bg-neon-cyan text-ink hover:bg-white"
                        : "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan hover:text-ink"
                    }`}
                  >
                    {clientProfile ? `Hi, ${getFirstName(clientProfile.name)}` : "Login"}
                  </button>

                  {clientProfile && (
                    <button
                      type="button"
                      onClick={() => {
                        logoutClient();
                        closeMenu();
                      }}
                      className="clip-corner-sm mx-3 mb-2 w-[calc(100%-1.5rem)] border border-edge-bright bg-ink-800/70 px-3 py-2.5 text-left text-sm font-semibold text-gray-300 transition hover:border-neon-magenta hover:text-white"
                    >
                      Logout
                    </button>
                  )}
                </li>

                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        isBranchActive(pathname, item) ? "page" : undefined
                      }
                      className={`block px-3 py-3 transition ${
                        isBranchActive(pathname, item)
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="ml-3 border-l border-edge pl-3">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className={`block px-3 py-2 text-sm transition ${
                              isActive(pathname, c.href)
                                ? "text-neon-cyan"
                                : "text-gray-500 hover:text-white"
                            }`}
                            onClick={closeMenu}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}

                <li className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-3 py-2 text-xs uppercase tracking-wider text-gray-500">
                    Featured
                  </p>
                  {FEATURED_SUBLINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`block px-3 py-2 text-sm transition ${
                        isActive(pathname, s.href)
                          ? "text-neon-cyan"
                          : "text-gray-500 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      {s.label}
                    </Link>
                  ))}
                </li>
              </ul>

              {/* Mobile socials */}
              <div className="mt-3 border-t border-white/10 px-3 pb-2 pt-3">
                <p className="mb-3 text-xs uppercase tracking-wider text-gray-500">
                  Follow NLDEVS
                </p>
                <div className="flex flex-row items-center gap-3">
                  {Socials.map((social) => {
                    const external = isExternalHref(social.href);

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        title={social.name}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="inline-flex opacity-80 transition hover:opacity-100"
                        onClick={closeMenu}
                      >
                        <Image
                          src={social.src}
                          alt=""
                          aria-hidden="true"
                          width={22}
                          height={22}
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
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
