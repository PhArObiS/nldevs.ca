import React from "react";
import UnrealEngineCard from "../sub/UnrealEngineCard";

const UnrealEngines = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="fortnitemaps">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      UNREAL ENGINE DEVELOPMENT
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        
        <UnrealEngineCard
          src="/UnrealEngineLogo.png"
          title="Unreal Engine"
          description="Best Game Engine"
        />
        <UnrealEngineCard
          src="/UnrealEngineLogo.png"
          title="Unreal Engine Development"
          description="Best Game Engine for game development"
        />
        <UnrealEngineCard
          src="/UnrealEngineLogo.png"
          title="UEFN"
          description="Best Game Engine"
        />
        <UnrealEngineCard
          src="/UnrealEngineLogo.png"
          title="UEFN Development"
          description="Best Game Engine for game development"
        />
      </div>
    </div>
  );
};

export default UnrealEngines;