import React from "react";
import FortniteMapsCard from "../sub/FortniteMapsCard";

const FortniteMaps = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="fortnitemaps">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      FAVORITE FORTNITE MAPS
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <FortniteMapsCard
          src="/MEGA_RAMP_SURVIVAL_TMNT.jpg"
          title="MEGA RAMP SURVIVAL 🌆🐢 TMNT"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/TMNT_CITY.jpg" 
          title="TMNT CITY 🌆 GUN GAME ONE SHOT 🎯"
          description="6 Best Fortnite Creative Maps"
        />
        <FortniteMapsCard
          src="/RED_VS _BLUE_SQUID_MINIGAME.jpg"
          title="RED VS BLUE 🔴🔵 SQUID MINIGAME 🦑"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/TILTED_SQUID_ROYALE_99 BOTS.jpg"
          title="TILTED SQUID ROYALE 🏆 99 BOTS"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/WINTERFEST_DEMON_HUNTERS_GUNGAME.jpg"
          title="❄️ WINTERFEST DEMON HUNTERS 👿 GUNGAME"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/RED_VS_BLUE_PLAYERS_VS_GUARDS.jpg"
          title="RED VS BLUE 🔴🔵 PLAYERS VS GUARDS 🦑"
          description="6 Best Fortnite Creative Maps."
        />
      </div>
    </div>
  );
};

export default FortniteMaps;
