"use client";

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
      className="flex flex-col lg:flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
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
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          {/* <span>Welcome,</span> */}
        </motion.div>

        {/* Third section - Paragraphs */}
        <motion.section
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
          style={{ textAlign: "justify" }}
        >
          <p className="mb-6">
            Welcome to NLDevs
          </p>
          <p className="mb-6">
            We are a passionate Fortnite creative team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe. 
          </p>
          <p className="mb-6">
            Join us on this creative journey and make sure to follow our creator page and check out our community for the latest updates and new creations!
            Below are our favorite fortnite maps.
          </p>
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
            alt="NLDevs Fortnite Creative Team logo"
            fill
            className="object-contain transition-all duration-300 ease-in-out"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
