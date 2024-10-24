import React from "react";
import FortniteResourcesCard from "../sub/FortniteResourcesCard";

const FortniteResources = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="fortniteresources">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      6 BEST FORTNITE CREATIVE RESOURCES
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resources."
        />
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resources."
        />
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resources."
        />
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resourcess."
        />
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resources."
        />
        <FortniteResourcesCard
          src="/FortniteCreativeImage.jpg"
          title="6 Best Fortnite Creative Resources"
          description="Fortnite Creative Resources."
        /> 
        
      </div>
    </div>
  );
};

export default FortniteResources;
