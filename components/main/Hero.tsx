import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants/site";

const stats = [
  { value: "6", label: "Live experiences" },
  { value: "5", label: "Map categories" },
  { value: "UEFN", label: "Built with" },
];

const categories = [
  { href: "/star-wars-fortnite-maps", label: "Star Wars" },
  { href: "/tmnt-fortnite-maps", label: "TMNT" },
  { href: "/squid-game-fortnite-maps", label: "Squid Game" },
  { href: "/fortnite-gun-game-maps", label: "Gun Games" },
  { href: "/best-fortnite-xp-maps", label: "XP Maps" },
];

const memberPerks = [
  "Early map drops",
  "Playtest invites",
  "Vote on new themes",
  "Send feedback directly",
];

/**
 * Server component on purpose.
 *
 * The intro animation is pure CSS rather than framer-motion: a JS-driven
 * `initial="hidden"` renders `opacity: 0` into the server HTML, so the hero
 * stays invisible until React hydrates — a blank first paint on slow
 * connections and permanently blank with JS disabled. CSS animations start as
 * soon as the stylesheet parses and need no hydration, which keeps LCP fast.
 * The global prefers-reduced-motion rule collapses these to ~0s.
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-14 md:pt-20"
      aria-label="NLDEVS introduction"
    >
      {/* Decorative backdrop */}
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.20) 0%, rgba(3,0,20,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-20 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(233,53,193,0.18) 0%, rgba(3,0,20,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="eyebrow animate-fade-up">UEFN Game Studio</p>

        <h1
          className="animate-fade-up mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          NLDEVS builds{" "}
          <span className="neon-text-animated">Fortnite experiences</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          Star Wars, TMNT, Squid Game, Gun Games and XP maps — built with Unreal
          Editor for Fortnite for fast rounds, clean flow, and squad chaos.
        </p>

        {/* Primary actions */}
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href={SOCIAL_LINKS.fortnite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon clip-corner-sm"
          >
            Follow @nldevs on Fortnite
          </a>

          <Link href="#featured-fortnite-maps" className="btn-ghost clip-corner-sm">
            Get map codes
          </Link>
        </div>

        <div
          className="animate-fade-up mx-auto mt-6 max-w-3xl"
          style={{ animationDelay: "280ms" }}
        >
          <Link
            href="/playtest-squad"
            className="clip-corner group block border border-neon-cyan/40 bg-ink-800/55 px-4 py-3 text-left shadow-[0_0_28px_rgba(34,211,238,0.10)] transition hover:border-neon-cyan hover:bg-neon-cyan/10 sm:px-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan">
                  NLDEVS Playtest Squad
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Member perks for players who want closer access.
                </p>
              </div>
              <span className="text-xs font-black uppercase tracking-wide text-neon-magenta transition group-hover:text-white">
                Join free
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {memberPerks.map((perk) => (
                <span
                  key={perk}
                  className="clip-corner-sm border border-edge-bright/70 bg-ink/70 px-3 py-1.5 text-xs font-semibold text-gray-300"
                >
                  {perk}
                </span>
              ))}
            </div>
          </Link>
        </div>

        <p
          className="animate-fade-up mt-4 text-sm font-semibold text-gray-400"
          style={{ animationDelay: "300ms" }}
        >
          Following the creator page helps NLDEVS grow and keeps new Fortnite
          experiences easier to find.
        </p>

        {/* Category chips */}
        <nav
          aria-label="Map categories"
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: "320ms" }}
        >
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="clip-corner-sm border border-edge-bright/70 bg-ink-800/60 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan hover:text-white"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        {/* Stat row */}
        <dl
          className="animate-fade-up mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4"
          style={{ animationDelay: "400ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="clip-corner border border-edge/70 bg-ink-800/40 px-3 py-5 text-center"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-2xl font-bold text-white md:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-gray-400">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
