import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { rawArray } from "@/components/pages/PageSections";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/i18n/pageMetadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return pageMetadata("/privacy", locale);
}

export default function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return <PrivacyPage />;
}

function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = rawArray<{ title: string; items: string[] }>(t, "sections");

  return (
    <main id="top" className="mx-auto w-full max-w-4xl px-6 py-14">
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(3,0,20,0) 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="eyebrow">NLDEVS</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
            {t("intro")}
          </p>
        </div>
      </section>

      <div className="mt-12 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-relaxed text-gray-400">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold text-white">{t("emailsTitle")}</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            {t("emailsBody")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">{t("manageTitle")}</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            {/* Rich tag rather than a split sentence, so each language can put
                the address wherever its grammar needs it. */}
            {t.rich("manageBody", {
              mail: (chunks) => (
                <a
                  href="mailto:nldevsmtl@gmail.com"
                  className="text-neon-cyan underline underline-offset-4 transition hover:text-white"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">
            {t("thirdPartyTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            {t("thirdPartyBody")}
          </p>
        </section>

        <div className="border-t border-white/10 pt-6">
          <Link
            href="/"
            className="clip-corner-sm inline-flex border border-neon-cyan bg-neon-cyan px-5 py-3 font-black uppercase tracking-wide text-ink transition hover:bg-white"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
