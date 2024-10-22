import React from "react";
import FortniteMapsCard from "../sub/FortniteMapsCard";

const FortniteMaps = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="fortnitemaps">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      6 BEST FORTNITE CREATIVE MAPS
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg"
          title="Mega Room"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg" 
          title="Fortkea"
          description="6 Best Fortnite Creative Maps"
        />
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg"
          title="Space Station Escape"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg"
          title="The Floor is Lava Zone Wars"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg"
          title="Mega World Bossfight"
          description="6 Best Fortnite Creative Maps."
        />
        <FortniteMapsCard
          src="/FortniteCreativeImage.jpg"
          title="Crazy Cards"
          description="6 Best Fortnite Creative Maps."
        />
      </div>
    </div>
  );
};

export default FortniteMaps;
