import React from "react";
import UnrealEngineCard from "../sub/UnrealEngineCard";

const UnrealEngines = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        UNREAL ENGINE
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        
        <UnrealEngineCard
          src="/UnrealEngineObstacle.png"
          title="Obstacle Assault"
          description="Obstacle Assault using UE5 | Udemy course"
        />
        <UnrealEngineCard
          src="/UnrealEngineCryptRaider.png"
          title="Crypt Raider"
          description="Crypt Raider using UE5 | Udemy course"
        />
        <UnrealEngineCard
          src="/UnrealEngineShooter.png"
          title="Simple Shooter"
          description="Simple Shooter using UE5 | Udemy course"
        />
        <UnrealEngineCard
          src="/UnrealEngineToonTanks.png"
          title="Toon Tanks"
          description="Toon Tanks using UE5 | Udemy Course"
        />
      </div>
    </div>
  );
};

export default UnrealEngines;