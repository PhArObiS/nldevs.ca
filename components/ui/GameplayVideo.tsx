import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants/site";

type Props = {
  title: string;
  description: string;
  poster: string;
  youtubeId?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function GameplayVideo({
  title,
  description,
  poster,
  youtubeId,
  ctaHref,
  ctaLabel = "View map",
}: Props) {
  return (
    <div className="clip-corner relative overflow-hidden border border-edge/70 bg-ink-800">
      <div className="relative aspect-video">
        {youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={`${title} gameplay video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={poster}
              alt={`${title} gameplay preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="eyebrow">Gameplay spotlight</p>
              <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-white md:text-4xl">
                {title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {ctaHref && (
                  <Link href={ctaHref} className="btn-neon clip-corner-sm">
                    {ctaLabel}
                  </Link>
                )}
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost clip-corner-sm"
                >
                  Watch NLDEVS
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
