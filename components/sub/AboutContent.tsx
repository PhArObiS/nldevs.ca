"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const AboutContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-20 mt-6 w-full z-[20]"
      id="about-us"
    >
      {/* Content section */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* First section - Welcome box */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          style={{ borderRadius: 0 }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <p className="Welcome-text text-[13px]">
            Our Favorite Fortnite Maps
          </p>

          {/* <h1 className="Welcome-text text-[13px]">
            Our Favorite Fortnite Maps
          </h1> */}
        </motion.div>

        {/* Second section - Introduction */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 max-w-[700px]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            NLDevs Fortnite Creative Team
          </h2>
          <p className="text-lg text-gray-300">
            UEFN creators building replayable maps, gun games, and themed experiences.
          </p>
        </motion.div>


        {/* Third section - Paragraphs */}
        <motion.section
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
          style={{ textAlign: "justify" }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Welcome to NLDevs
          </h3>

          <p className="mb-6">
            We are a passionate Fortnite creative team specializing in Unreal Editor for Fortnite (UEFN).
            Our mission is to build innovative, replayable, and visually engaging Fortnite experiences.
          </p>

          <p className="mb-6">
            Explore our latest creations and discover new gameplay experiences built for fun,
            competition, and progression.
          </p>

          <p className="mb-6">
            Join us on this creative journey and make sure to follow our creator page and check out our community for the latest updates and new creations!
            Below are our favorite fortnite maps.
          </p>

          {/* ⭐ ADD YOUR INTERNAL LINKS HERE */}
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

          <p className="mt-6">
            <span className="font-semibold block mb-2">
              Join our Community:
            </span>

            <a
              href="https://www.fortnite.com/@nldevs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              @nldevs on Fortnite
            </a>
          </p>
        </motion.section>
      </div>

      {/* Image section */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-[70vw] h-auto max-w-[400px] lg:max-w-[600px] mx-auto lg:ml-8 mt-8 lg:mt-0" // Increased left margin for larger screens
      >
        <div className="relative w-full h-0 pb-[100%]">
          <Image
            src="/FortniteCreativeTeamLogo.png"
            alt="NLDEVS Fortnite Creative Team logo"
            fill
            className="object-contain transition-all duration-300 ease-in-out"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
