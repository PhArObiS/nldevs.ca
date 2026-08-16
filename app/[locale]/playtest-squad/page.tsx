import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { rawArray } from "@/components/pages/PageSections";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/i18n/pageMetadata";
import type { Locale } from "@/i18n/routing";
import { SOCIAL_LINKS } from "@/constants/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/playtest-squad", locale);
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return <PlaytestSquadPage />;
}

function PlaytestSquadPage() {
  const t = useTranslations("playtest");
  const tc = useTranslations("common");

  const perkStrip = rawArray<string>(t, "perks");
  const benefits = rawArray<{ title: string; text: string }>(t, "benefits");

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14">
      <Reveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => <span className="neon-text">{chunks}</span>,
          })}
          description={t("description")}
          align="left"
        />
      </Reveal>

      <Reveal className="mt-10">
        <div className="clip-corner relative overflow-hidden border border-neon-cyan/40 bg-ink-800/60 px-6 py-10 md:px-10">
          <div
            className="pointer-events-none absolute inset-0 grid-backdrop"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
                {t("heroBody")}
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-500">
                {t("heroNote")}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {perkStrip.map((perk) => (
                  <span
                    key={perk}
                    className="clip-corner-sm border border-edge-bright/70 bg-ink/70 px-3 py-1.5 text-xs font-semibold text-gray-300"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={SOCIAL_LINKS.fortnite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon clip-corner-sm"
              >
                {tc("followNldevs")}
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost clip-corner-sm"
              >
                {t("joinDiscord")}
              </a>
              <Link href="/" className="btn-ghost clip-corner-sm">
                {t("exploreMaps")}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
        {benefits.map((benefit) => (
          <RevealItem key={benefit.title}>
            <article className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6 transition hover:border-neon-cyan/60">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-cyan">
                {t("squadPerk")}
              </p>
              <h2 className="mt-3 text-xl font-bold text-white">
                {benefit.title}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-400">
                {benefit.text}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
