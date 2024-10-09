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
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          style={{ borderRadius: 0 }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Game & Software Developer / 3D Animator
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Hi,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              I&apos;m Neil.
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
          style={{ textAlign: "justify" }}
        >
          <p className="mb-4">
            I am a dynamic Full Stack Software Developer with a diverse skill set spanning website, mobile, software, and game development. My technical expertise includes C++, C#, TypeScript, and JavaScript, with a solid command of frameworks like React, Node.js, and Three.js. I'm a fast learner, constantly adapting to new technologies and methodologies, and thrive on creating scalable, efficient, and user-centric solutions that address real-world challenges. Collaboration is at the core of my work, and I excel at working closely with clients or tasks to deliver impactful results.
          </p>
          <p className="mb-4">
            In addition to my development skills, I have a deep-rooted passion for 3D animation, with proficiency in industry-standard tools such as Maya, 3ds Max, Blender, and Unreal Engine. I find fulfillment in working within team-driven environments, where collective success and growth are paramount. I actively seek opportunities to challenge myself, evolve my skillset, and drive innovation in every project.
          </p>
          <p className="mb-4">
            For over two years now, I have been intensively focused on mastering C# and C++, specifically within game development using Unity and Unreal Engine. I am now eagerly pursuing new opportunities to realize my lifelong ambition of making a meaningful impact in the game development industry.
          </p>
        </motion.p>

        <motion.a
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
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/UnderConstruction.png"
          alt="work icons"
          height={350}
          width={350}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
