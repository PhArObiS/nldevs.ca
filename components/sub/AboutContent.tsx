"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const AboutContent = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      aria-labelledby="about-title"
      className="flex flex-col lg:flex-row items-center justify-center px-6 md:px-10 lg:px-20 mt-6 w-full z-[20]"
      id="about-us"
    >
      {/* Content section */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Welcome box */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] inline-flex items-center"
          style={{ borderRadius: 0 }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <p className="Welcome-text text-[13px]">NLDEVS — UEFN Game Studio</p>
        </motion.div>

        {/* Headline + subcopy */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 max-w-[720px]"
        >
          <h2 id="about-title" className="text-4xl md:text-5xl font-bold text-white">
            We build Fortnite experiences
          </h2>

          <p className="text-lg text-gray-300">
            NLDEVS is a UEFN studio creating replayable Fortnite maps: gun games, themed adventures,
            and progression-based experiences.
          </p>

          <p className="text-sm text-gray-400">
            Currently shipping <span className="text-gray-200 font-semibold">6</span> live experiences.
          </p>
        </motion.div>

        {/* Body */}
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px] text-left"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Welcome to NLDEVS</h3>

          <p className="mb-6">
            We build with Unreal Editor for Fortnite (UEFN), focusing on fun-first gameplay loops,
            clean flow, and strong replay value—whether you’re grinding rounds, practicing aim, or
            playing with friends.
          </p>

          <p className="mb-6">
            Explore our maps below, or follow our creator page to keep up with new releases and updates.
          </p>

          <p className="mt-6 text-sm text-gray-400">Browse by category:</p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link className="text-cyan-300 underline hover:text-cyan-200" href="/tmnt-fortnite-maps">
              TMNT Maps
            </Link>
            <Link className="text-cyan-300 underline hover:text-cyan-200" href="/squid-game-fortnite-maps">
              Squid Game Maps
            </Link>
            <Link className="text-cyan-300 underline hover:text-cyan-200" href="/fortnite-gun-game-maps">
              Gun Game Maps
            </Link>
            <Link className="text-cyan-300 underline hover:text-cyan-200" href="/best-fortnite-xp-maps">
              XP Maps
            </Link>
          </div>

          <div className="mt-8">
            <span className="font-semibold block mb-2 text-white">Join our Community</span>

            <a
              href="https://www.fortnite.com/@nldevs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              @nldevs on Fortnite →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Image section */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-[70vw] h-auto max-w-[400px] lg:max-w-[600px] mx-auto lg:ml-8 mt-8 lg:mt-0"
      >
        <div className="relative w-full h-0 pb-[100%]">
          <Image
            src="/FortniteCreativeTeamLogo.png"
            alt="NLDEVS — UEFN Game Studio logo"
            fill
            sizes="(max-width: 1024px) 70vw, 600px"
            className="object-contain transition-all duration-300 ease-in-out"
            priority={false}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutContent;
