import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { SOCIAL_LINKS } from "@/constants/site";

const categories: { href: AppPathname; labelKey: string }[] = [
  { href: "/star-wars-fortnite-maps", labelKey: "starWars" },
  { href: "/tmnt-fortnite-maps", labelKey: "tmnt" },
  { href: "/squid-game-fortnite-maps", labelKey: "squidGame" },
  { href: "/fortnite-gun-game-maps", labelKey: "gunGames" },
  { href: "/best-fortnite-xp-maps", labelKey: "xpMaps" },
];

const PERK_KEYS = [
  "perkEarlyDrops",
  "perkPlaytestInvites",
  "perkVote",
  "perkFeedback",
] as const;

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
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  const stats = [
    { value: "6", label: t("statLiveExperiences") },
    { value: "5", label: t("statMapCategories") },
    { value: "UEFN", label: t("statBuiltWith") },
  ];

  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-14 md:pt-20"
      aria-label={t("introAria")}
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
        <p className="eyebrow animate-fade-up">{t("eyebrow")}</p>

        <h1
          className="animate-fade-up mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          {/* Rich tag rather than a split string, so each language decides
              where the highlighted phrase sits in the sentence. */}
          {t.rich("title", {
            accent: (chunks) => (
              <span className="neon-text-animated">{chunks}</span>
            ),
          })}
        </h1>

        <p
          className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {t("subtitle")}
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
            {tc("followFortnite")}
          </a>

          <a href="#featured-fortnite-maps" className="btn-ghost clip-corner-sm">
            {t("getMapCodes")}
          </a>
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
                  {t("squadName")}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {t("squadPitch")}
                </p>
              </div>
              <span className="text-xs font-black uppercase tracking-wide text-neon-magenta transition group-hover:text-white">
                {tc("joinFree")}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PERK_KEYS.map((key) => (
                <span
                  key={key}
                  className="clip-corner-sm border border-edge-bright/70 bg-ink/70 px-3 py-1.5 text-xs font-semibold text-gray-300"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </Link>
        </div>

        <p
          className="animate-fade-up mt-4 text-sm font-semibold text-gray-400"
          style={{ animationDelay: "300ms" }}
        >
          {t("followNote")}
        </p>

        {/* Category chips */}
        <nav
          aria-label={t("categoriesAria")}
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: "320ms" }}
        >
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="clip-corner-sm border border-edge-bright/70 bg-ink-800/60 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan hover:text-white"
            >
              {tn(c.labelKey)}
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
