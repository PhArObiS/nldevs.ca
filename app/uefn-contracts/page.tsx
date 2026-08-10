import type { Metadata } from "next";
import Link from "next/link";
import { SOCIAL_LINKS, SITE_URL } from "@/constants/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "UEFN Contracts",
  description:
    "Hire NLDEVS for UEFN contracts, Fortnite map building, branded experiences, and game studio support.",
  alternates: { canonical: "/uefn-contracts" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/uefn-contracts`,
    title: "UEFN Contracts | NLDEVS",
    description:
      "NLDEVS builds Fortnite and UEFN experiences for clients, brands, creators, and studios.",
  },
};

const services = [
  "UEFN map builds and prototypes",
  "Fortnite tycoon, PvP, gun game, and event-style islands",
  "Branded Fortnite experiences",
  "Gameplay loop design and polish",
  "Verse, devices, UI, testing, and launch support",
  "Existing island cleanup, updates, and optimization",
];

const clientTypes = [
  "Creators who need a reliable UEFN build partner",
  "Brands exploring Fortnite experiences",
  "Game studios that need extra UEFN production help",
  "Teams that want a playable prototype before a bigger launch",
];

export default function UefnContractsPage() {
  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <Reveal>
        <SectionHeading
          eyebrow="Developer / Client Work"
          title="UEFN contracts,"
          accent="Fortnite experiences"
          description="NLDEVS builds playable UEFN projects for creators, clients, brands, and studios that need Fortnite production help."
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
                Hire NLDEVS for UEFN builds.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
                From prototypes to polished Fortnite islands, NLDEVS can help
                plan, build, test, and improve UEFN experiences with a clean
                production workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="mailto:nldevsmtl@gmail.com?subject=UEFN%20contract%20inquiry"
                className="btn-neon clip-corner-sm"
              >
                Start a project
              </a>
              <a
                href={SOCIAL_LINKS.fortnite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost clip-corner-sm"
              >
                View creator page
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
        <RevealItem>
          <section className="clip-corner h-full border border-edge/70 bg-ink-800/50 p-6">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              What NLDEVS can build
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
            <p className="eyebrow">Who It Helps</p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Built for serious projects
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
              <p className="eyebrow">Project Inquiry</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                Send the goal, timeline, and budget range.
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">
                Keep the first message simple: what you want built, whether it
                is a new island or existing project, your ideal launch window,
                and any references or must-have gameplay features.
              </p>
            </div>
            <Link href="/" className="btn-ghost clip-corner-sm lg:justify-self-end">
              Explore NLDEVS maps
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
