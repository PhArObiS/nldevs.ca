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
  return pageMetadata("/uefn-contracts", locale);
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return <UefnContractsPage />;
}

function UefnContractsPage() {
  const t = useTranslations("contracts");

  const services = rawArray<string>(t, "services");
  const clientTypes = rawArray<string>(t, "clientTypes");

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
        <section className="clip-corner relative overflow-hidden border border-neon-cyan/40 bg-ink-800/70 px-6 py-10 md:px-10">
          <div
            className="pointer-events-none absolute inset-0 grid-backdrop"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
                {t("heroBody")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {/* Subject line is localized so the inbox shows the enquiry
                  language at a glance. */}
              <a
                href={`mailto:nldevsmtl@gmail.com?subject=${encodeURIComponent(
                  t("mailSubject")
                )}`}
                className="btn-neon clip-corner-sm"
              >
                {t("startProject")}
              </a>
              <a
                href={SOCIAL_LINKS.fortnite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost clip-corner-sm"
              >
                {t("viewCreatorPage")}
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
        <RevealItem>
          <section className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6">
            <p className="eyebrow">{t("servicesEyebrow")}</p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              {t("servicesTitle")}
            </h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 leading-relaxed text-gray-400">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6">
            <p className="eyebrow">{t("clientsEyebrow")}</p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              {t("clientsTitle")}
            </h2>
            <ul className="mt-5 list-disc space-y-2.5 pl-5 leading-relaxed text-gray-400">
              {clientTypes.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          </section>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mt-12">
        <section className="clip-corner border border-neon-violet/60 bg-ink-900/70 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">{t("inquiryEyebrow")}</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">
                {t("ctaBody")}
              </p>
            </div>
            <Link
              href="/"
              className="btn-ghost clip-corner-sm lg:justify-self-end"
            >
              {t("exploreMaps")}
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
