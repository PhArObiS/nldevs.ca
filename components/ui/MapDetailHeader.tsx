import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageHeader from "./PageHeader";
import IslandCode from "./IslandCode";
import { Reveal } from "./Reveal";
import type { Crumb } from "@/components/main/Breadcrumbs";

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  code: string;
  image: string;
  intro?: ReactNode;
  stats?: { label: string; value: string }[];
};

/**
 * Shared top-of-page block for a single map: breadcrumbs, title, the island
 * code panel with copy button, and the hero screenshot.
 */
export default function MapDetailHeader({
  crumbs,
  eyebrow,
  title,
  code,
  image,
  intro,
  stats = [],
}: Props) {
  const t = useTranslations("common");

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={title}
        description={intro}
      >
        <IslandCode code={code} title={title} />
      </PageHeader>

      {stats.length > 0 && (
        <Reveal className="mt-8">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={`${stat.label}-${stat.value}`}
                className="clip-corner-sm border border-edge/70 bg-ink-800/60 px-4 py-3"
              >
                <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-cyan">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      <Reveal className="mt-12">
        <div className="clip-corner relative aspect-video w-full overflow-hidden border border-edge/70 bg-ink-800">
          <Image
            src={image}
            alt={t("gameplayScreenshot", { title })}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      </Reveal>
    </>
  );
}
