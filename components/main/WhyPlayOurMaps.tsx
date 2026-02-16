// components/main/WhyPlayOurMaps.tsx
import React from "react";
import Link from "next/link";

const reasons = [
  {
    title: "Highly replayable game modes",
    desc: "Our islands are built around repeatable gameplay loops—Gun Games, survival runs, and fast minigames designed to stay fun after the first match.",
  },
  {
    title: "Optimized UEFN performance",
    desc: "Built with Unreal Editor for Fortnite (UEFN) using clean layouts and optimization for smooth gameplay sessions.",
  },
  {
    title: "Clear goals and progression systems",
    desc: "Simple objectives and structured progression keep players engaged and playing longer.",
  },
  {
    title: "Unique themed Fortnite experiences",
    desc: "TMNT maps, Squid-style minigames, and distinct gameplay themes with strong visual identity.",
  },
];

export default function WhyPlayOurMaps() {
  return (
    <section
      id="why-play"
      aria-label="Why play our Fortnite maps"
      className="px-6 py-12 max-w-6xl mx-auto"
    >
      <div className="rounded-2xl border border-[#2A0E61] bg-[#03001466] backdrop-blur-md p-6 md:p-10">
        <header>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why play our Fortnite maps?
          </h2>

          <p className="mt-4 text-gray-300 max-w-3xl">
            NLDEVS builds Fortnite experiences with UEFN that focus on replayability,
            clear objectives, and fun game loops. If you like Gun Games, survival runs,
            and themed minigames, you’ll fit right in.
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-xl font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-gray-300">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Strong CTA to push users deeper into the homepage content */}
        <div className="mt-10">
          <Link
            href="#featured-fortnite-maps"
            className="inline-block rounded-lg bg-cyan-500 px-6 py-3 text-white font-semibold hover:bg-cyan-400 transition"
          >
            Explore Featured Maps →
          </Link>
        </div>

        {/* Internal category links (crawl hub) */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/tmnt-fortnite-maps"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            TMNT Maps →
          </Link>

          <Link
            href="/squid-game-fortnite-maps"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Squid Game Maps →
          </Link>

          <Link
            href="/fortnite-gun-game-maps"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Gun Game Maps →
          </Link>

          <Link
            href="/best-fortnite-xp-maps"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            XP Maps →
          </Link>
        </div>
      </div>
    </section>
  );
}
