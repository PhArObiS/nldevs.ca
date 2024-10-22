import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import {
  UnrealEngine_skill,
  UEFN_skill,
} from "@/constants";

const Skills = () => {
  const renderSkillSet = (skillSet: any) => (
    <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
      {skillSet.map((image: any, index: number) => (
        <SkillDataProvider
          key={index}
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
        />
      ))}
    </div>
  );

  return (
    <section
      id="about-me"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-80 py-20 scale-down"
    >
      <SkillText />

      {renderSkillSet(UnrealEngine_skill)}
      {renderSkillSet(UEFN_skill)}

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          {/* <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
