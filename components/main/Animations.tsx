import React from "react";
import AnimationCard from "../sub/AnimationCard";

const Animations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="animations">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        ANIMATION
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <AnimationCard
          src="/WalkingAnimation.png"
          title="Walk Animation in Maya"
          description="Walking animation cycle using Maya."
        />
        <AnimationCard
          src="/RunningAnimation.png"
          title="Run Animation in Maya"
          description="Running Animation cycle using 3D Max."
        />
        <AnimationCard
          src="/LiftingAnimation.png"
          title="Lifting Animation in 3D Max"
          description="Lifting animation showing weight."
        />
        <AnimationCard
          src="/JumpingAnimation.png"
          title="Jumping Animation in 3D Max"
          description="Jumping animation showing principles."
        />
        <AnimationCard
          src="/LipSyncAnimation.png"
          title="Lip sync Animation in Maya"
          description="Jumping animation showing animation principles."
        />
        <AnimationCard
          src="/AnimationShooterUE5.png"
          title="Animation in Unreal Engine"
          description="Animation tree for Shooter game."
        />
      </div>
    </div>
  );
};

export default Animations;
