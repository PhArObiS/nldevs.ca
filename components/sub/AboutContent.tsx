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
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      id="about-me"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* First section - Welcome box */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          style={{ borderRadius: 0 }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            FORTNITE UEFN GAMES
            {/* Game & Software Developer / 3D Animator */}
          </h1>
        </motion.div>

        {/* Second section - Introduction */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Welcome,{" "}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              I&apos;m Neil.
            </span> */}
          </span>
        </motion.div>

        {/* Third section - Paragraphs */}
        {/* 
          Changed from <motion.p> to <motion.div> to avoid nesting <p> tags inside <p>,
          which was causing hydration issues. A <div> can contain multiple <p> tags. 
        */}
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
          style={{ textAlign: "justify" }}
        >
          <p className="mb-6">
            We are a passionate team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe. From designing unique maps and crafting immersive gameplay mechanics to integrating dynamic visual effects, we push the boundaries of what&apos;s possible within the Fortnite creative space.

            {/* I am a dynamic developer with a diverse skill set spanning website, mobile, software, and game development. My technical expertise includes C++, C#, TypeScript, and JavaScript, with a solid command of frameworks like React, Node.js, and Three.js. I am a fast learner, constantly adapting to new technologies and methodologies, and thrive on creating scalable, efficient, and user-centric solutions that address real-world challenges. Collaboration is at the core of my work, and I excel at working closely with clients or tasks to deliver impactful results. */}
          </p>
          <p className="mb-6">
            Whether you&apos;re looking for custom maps, game modes, or specialized effects, our team combines technical expertise with artistic vision to deliver top-tier content that stands out. Join us on this creative journey and explore the limitless potential of UEFN with us.
            {/* In addition to my development skills, I have a deep-rooted passion for 3D GameDev, with proficiency in industry-standard tools such as Maya, 3ds Max, Blender, and Unreal Engine. I find fulfillment in working within team-driven environments, where collective success and growth are paramount. I actively seek opportunities to challenge myself, evolve my skillset, and drive innovation in every project. */}
          </p>
          {/* <p className="mb-4">
            For the past two years, I have been deeply immersed in mastering C# and C++ with a focus on game development in Unity and Unreal Engine. Currently, I&apos;m working on a Fortnite Game Map using Unreal Editor for Fortnite (UEFN) and am actively seeking new opportunities to bring my passion for game development to life.
          </p> */}
        </motion.div>

        {/* Fourth section - GitHub and Resume buttons */}
        {/* <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          GitHub
        </motion.a>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Resume
        </motion.a> */}
      </div>

      {/* Fifth section - Image */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/UEFN.png"
          alt="work icons"
          height={350}
          width={350}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
