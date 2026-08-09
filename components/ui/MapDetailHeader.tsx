import type { ReactNode } from "react";
import Image from "next/image";
import PageHeader from "./PageHeader";
import IslandCode from "./IslandCode";
import { Reveal } from "./Reveal";

type Crumb = { href?: string; label: string };

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  code: string;
  image: string;
  intro?: ReactNode;
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
}: Props) {
  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={eyebrow} title={title} description={intro}>
        <IslandCode code={code} title={title} />
      </PageHeader>

      <Reveal className="mt-12">
        <div className="clip-corner relative aspect-video w-full overflow-hidden border border-edge/70 bg-ink-800">
          <Image
            src={image}
            alt={`${title} Fortnite gameplay screenshot`}
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
