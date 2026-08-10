"use client";

import { useEffect, useState } from "react";

const VOTE_STORAGE_KEY = "nldevs-next-map-vote";

const voteOptions = [
  "Star Wars boss raid",
  "TMNT city expansion",
  "Squid Game survival",
  "XP practice arena",
];

function openMemberAccess() {
  window.dispatchEvent(new Event("nldevs:open-client-login"));
}

export default function VoteNextMap() {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(window.localStorage.getItem(VOTE_STORAGE_KEY) ?? "");
  }, []);

  function vote(option: string) {
    setSelected(option);
    window.localStorage.setItem(VOTE_STORAGE_KEY, option);
  }

  return (
    <section
      id="vote-next-map"
      aria-labelledby="vote-next-map-title"
      className="mx-auto w-full max-w-6xl px-6 pb-20"
    >
      <div className="scanline-sheen clip-corner relative overflow-hidden border border-neon-magenta/40 bg-ink-800/60 px-6 py-10 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 grid-backdrop"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Members vote</p>
            <h2
              id="vote-next-map-title"
              className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl"
            >
              Vote the <span className="neon-text">next map direction</span>
            </h2>
            <p className="mt-4 leading-relaxed text-gray-400">
              Pick what you want NLDEVS to build around next. Join Member Access
              so your vote can be tied to your player profile.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {voteOptions.map((option) => {
              const active = selected === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => vote(option)}
                  className={`clip-corner-sm border px-4 py-3 text-left text-sm font-bold transition ${
                    active
                      ? "badge-pulse border-neon-cyan bg-neon-cyan text-ink"
                      : "border-edge-bright bg-ink/70 text-gray-300 hover:border-neon-cyan hover:text-white"
                  }`}
                >
                  {option}
                </button>
              );
            })}

            <button
              type="button"
              onClick={openMemberAccess}
              className="clip-corner-sm border border-neon-magenta bg-neon-magenta px-4 py-3 text-left text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-ink sm:col-span-2"
            >
              {selected ? "Join to lock in vote" : "Join and vote"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
