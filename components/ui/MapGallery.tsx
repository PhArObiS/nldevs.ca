import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type GalleryImage = {
  src: string;
  alt: string;
};

export default function MapGallery({
  title,
  images,
}: {
  title: string;
  images: GalleryImage[];
}) {
  if (images.length === 0) return null;

  return (
    <Reveal as="section" className="mt-16" aria-labelledby="gallery-title">
      <h2
        id="gallery-title"
        className="text-center text-2xl font-bold tracking-tight text-white md:text-left md:text-3xl"
      >
        Screenshot <span className="neon-text">gallery</span>
      </h2>

      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <RevealItem key={`${image.src}-${index}`}>
            <div className="clip-corner relative aspect-video overflow-hidden border border-edge/70 bg-ink-800">
              <Image
                src={image.src}
                alt={image.alt || `${title} screenshot ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
