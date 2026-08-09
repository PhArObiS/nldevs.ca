import type { Metadata } from "next";
import Link from "next/link";
import { SOCIAL_LINKS, SITE_URL } from "@/constants/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "NLDEVS Playtest Squad",
  description:
    "Join the NLDEVS Playtest Squad for Fortnite map drops, playtest invites, Discord updates, and future UEFN collaboration opportunities.",
  alternates: { canonical: "/playtest-squad" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/playtest-squad`,
    title: "NLDEVS Playtest Squad",
    description:
      "Join NLDEVS for Fortnite map drops, playtest invites, and UEFN community updates.",
  },
};

const benefits = [
  {
    title: "Early Playtest Calls",
    text: "Catch opportunities to test new maps, report issues, and help shape map flow before broader pushes.",
  },
  {
    title: "Map Drops",
    text: "Get notified when NLDEVS launches or updates Fortnite islands, including new codes and status changes.",
  },
  {
    title: "Creator Feedback",
    text: "Send ideas, screenshots, bugs, and gameplay reactions directly into the NLDEVS loop.",
  },
  {
    title: "Future Collabs",
    text: "Developers, artists, testers, and UEFN creators can signal interest for future work or collaboration.",
  },
];

export default function PlaytestSquadPage() {
  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-14">
      <Reveal>
        <SectionHeading
          eyebrow="Community"
          title="Join the NLDEVS"
          accent="Playtest Squad"
          description="A simple way to stay close to new maps, tests, updates, and collaboration opportunities from NLDEVS."
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
                Playtest. Give feedback. Catch drops.
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
                Join the Discord for the fastest updates, and use Member Access
                on the site to tell NLDEVS what you want to help with.
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-500">
                No spam. No selling info. Delete anytime.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon clip-corner-sm"
              >
                Join Discord
              </a>
              <Link href="/" className="btn-ghost clip-corner-sm">
                Explore maps
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
                Squad perk
              </p>
              <h2 className="mt-3 text-xl font-bold text-white">
                {benefit.title}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-400">{benefit.text}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
