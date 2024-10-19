import React from "react";
import GameDevCard from "../sub/GameDevCard";

const GameDev = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="GameDev">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      FORTNITE UEFN CREATORS
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <GameDevCard
          src="/WalkingAnimation.png"
          title="Walk Cycle in Maya"
          description="Walking GameDev cycle using Maya."
        />
        <GameDevCard
          src="/RunningAnimation.png"
          title="Run Cycle in Maya"
          description="Running GameDev cycle using 3D Max."
        />
        <GameDevCard
          src="/LiftingAnimation.png"
          title="Showing weight in 3D Max"
          description="Lifting GameDev showing weight."
        />
        <GameDevCard
          src="/JumpingAnimation.png"
          title="Jumping GameDev in 3D Max"
          description="Jumping GameDev showing principles."
        />
        <GameDevCard
          src="/LipSyncAnimation.png"
          title="Lip sync GameDev in Maya"
          description="Jumping GameDev showing GameDev principles."
        />
        <GameDevCard
          src="/AnimationShooterUE5.png"
          title="GameDev in Unreal Engine"
          description="GameDev tree for Shooter game."
        /> 
        
      </div>
    </div>
  );
};

export default GameDev;
