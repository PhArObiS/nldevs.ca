import React from "react";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const reasons = [
  {
    num: "01",
    title: "Highly replayable modes",
    desc: "Islands built around repeatable loops — gun games, survival runs, and fast minigames that stay fun after the first match.",
  },
  {
    num: "02",
    title: "Optimized UEFN performance",
    desc: "Clean layouts and deliberate optimization so sessions stay smooth on every platform.",
  },
  {
    num: "03",
    title: "Clear goals and progression",
    desc: "Simple objectives and structured progression that keep players engaged and playing longer.",
  },
  {
    num: "04",
    title: "Distinct themed worlds",
    desc: "Star Wars, TMNT, Squid-style minigames — each with its own strong visual identity.",
  },
];

export default function WhyPlayOurMaps() {
  return (
    <section
      id="why-play"
      aria-labelledby="why-play-title"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <Reveal>
        <SectionHeading
          id="why-play-title"
          eyebrow="Why NLDEVS"
          title="Maps built to be"
          accent="played twice"
          description="We focus on replayability, clear objectives, and gameplay loops that hold up. If you like gun games, survival runs, and themed minigames, you'll fit right in."
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {reasons.map((r) => (
          <RevealItem key={r.title} className="h-full">
            <div className="clip-corner group h-full border border-edge/70 bg-ink-800/50 p-7 transition-colors duration-300 hover:border-neon-cyan/50">
              <span
                className="font-mono text-sm font-bold text-neon-violet/70"
                aria-hidden="true"
              >
                {r.num}
              </span>

              <h3 className="mt-3 text-xl font-bold text-white">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">{r.desc}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 flex flex-wrap items-center gap-4">
        <Link href="#featured-fortnite-maps" className="btn-neon clip-corner-sm">
          Explore featured maps
        </Link>

        <Link href="/best-fortnite-xp-maps" className="btn-ghost clip-corner-sm">
          Best XP maps
        </Link>
      </Reveal>
    </section>
  );
}
