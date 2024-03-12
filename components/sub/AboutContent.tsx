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
      id="about-me"  // Add the id attribute here
    >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
            style={{ borderRadius: 0 }}  // Set border-radius to 0 for a rectangular shape
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Fullstack Developer / 3d Animator
            </h1>
          </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Hi, {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              
              I&apos;m Neil.
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
        >
          I am a Full Stack junior Software developer with with knowledge in Website, Mobile, and Software development. I have knowledge in C++, C#, TypeScript and JavaScript, and in frameworks like React, Node.js, and Three.js. I am a quick learner and collaborate well with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. 3d animation is also something I enjoy and can do, using Maya, 3d Max and the awesome Unreal Engine. Gaming and 3d animation are my hobbies, and I am always looking for new ways to improve my skills and learn new things. I am also a team player and enjoy working with others to achieve a common goal and always looking for new opportunities to grow and improve my skills as a developer and 3d animator. Lately, I have been focussed on C++ and game development using the Unreal Engine.

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
          src="/gitwhite.png"
          alt="work icons"
          height={350}
          width={350}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
