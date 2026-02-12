
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
    <motion.section
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      id="about-us"
      aria-label="About NLDevs"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Small label - NOT H1 */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          style={{ borderRadius: 0 }}
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <p className="Welcome-text text-[13px]">
            Curated by NLDevs
          </p>
        </motion.div>

        {/* REAL H1 */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 font-bold text-white max-w-[800px]"
        >
          <h1 className="text-5xl lg:text-6xl leading-tight">
            Favorite Fortnite Maps
          </h1>
          <p className="text-lg text-gray-300 font-normal">
            A curated list of top Fortnite Creative and UEFN experiences—map codes, highlights, and what makes each one worth playing.
          </p>
        </motion.div>

        {/* Supporting copy */}
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-300 my-5 max-w-[800px]"
          style={{ textAlign: "justify" }}
        >
          <p className="mb-6">Welcome to NLDevs.</p>
          <p className="mb-6">
            We are a passionate Fortnite creative team specializing in Unreal Editor for Fortnite (UEFN). Our mission is to build innovative,
            interactive, and visually stunning experiences for the Fortnite universe.
          </p>
          <p className="mb-6">
            Follow our creator page and community for updates and new releases. Below are our favorite Fortnite maps.
          </p>

          <p className="mt-6">
            <span className="font-semibold block mb-2">Join our Community:</span>
            <a
              href="https://www.fortnite.com/@nldevs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              @nldevs on Fortnite
            </a>
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-[70vw] h-auto max-w-[400px] lg:max-w-[600px] mx-auto lg:ml-8 mt-8 lg:mt-0"
      >
        <div className="relative w-full h-0 pb-[100%]">
          <Image
            src="/FortniteCreativeTeamLogo.png"
            alt="NLDevs Fortnite Creative team logo"
            fill
            className="object-contain transition-all duration-300 ease-in-out"
            priority
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutContent;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   slideInFromLeft,
//   slideInFromRight,
//   slideInFromTop,
// } from "@/utils/motion";
// import { SparklesIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";

// const AboutContent = () => {
//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       className="flex flex-col lg:flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
//       id="about-us"
//     >
//       {/* Content section */}
//       <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
//         {/* First section - Welcome box */}
//         <motion.div
//           variants={slideInFromTop}
//           className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
//           style={{ borderRadius: 0 }}
//         >
//           <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
//           <h1 className="Welcome-text text-[13px]">
//             Our Favorite Fortnite Maps
//           </h1>
//         </motion.div>

//         {/* Second section - Introduction */}
//         <motion.div
//           variants={slideInFromLeft(0.5)}
//           className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
//         >
//           {/* <span>Welcome,</span> */}
//         </motion.div>

//         {/* Third section - Paragraphs */}
//         <motion.div
//           variants={slideInFromLeft(0.8)}
//           className="text-lg text-gray-300 my-5 max-w-[800px]"
//           style={{ textAlign: "justify" }}
//         >
//           <p className="mb-6">
//             Welcome to NLDevs
//           </p>
//           <p className="mb-6">
//             We are a passionate Fortnite creative team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe. 
//           </p>
//           <p className="mb-6">
//             Join us on this creative journey and make sure to follow our creator page and check out our community for the latest updates and new creations!
//             Below are our favorite fortnite maps.
//           </p>
//           <p className="mt-6">
//             <span className="font-semibold block mb-2">
//               Join our Community:
//             </span>

//             <a
//               href="https://www.fortnite.com/@nldevs"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block text-blue-400 hover:text-blue-300 underline transition duration-300"
//             >
//               @nldevs on Fortnite
//             </a>
//           </p>
//         </motion.div>
//       </div>

//       {/* Image section */}
//       <motion.div
//         variants={slideInFromRight(0.8)}
//         className="relative w-[70vw] h-auto max-w-[400px] lg:max-w-[600px] mx-auto lg:ml-8 mt-8 lg:mt-0" // Increased left margin for larger screens
//       >
//         <div className="relative w-full h-0 pb-[100%]">
//           <Image
//             src="/FortniteCreativeTeamLogo.png"
//             alt="Fortnite creative Team icon"
//             fill
//             className="object-contain transition-all duration-300 ease-in-out"
//           />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AboutContent;
