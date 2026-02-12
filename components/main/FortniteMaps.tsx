
import React from "react";
import FortniteMapsCard from "../sub/FortniteMapsCard";

const FortniteMaps = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="fortnitemaps">
      {/* <h2 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
      FAVORITE FORTNITE MAPS
      </h2> */}
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <FortniteMapsCard
          src="/MegaRampSurvival.jpeg"
          title="TMNT MEGA RAMP SURVIVAL 🌆🐢"
          description="0556-7584-6565"
        />
        <FortniteMapsCard
          src="/CityTMNT.jpeg" 
          title="TMNT CITY 🌆"
          description="1383-6989-3967"
        />
        <FortniteMapsCard
          src="/RedVsBlueSquidMinigame.jpg"
          title="RvB 🔴🔵 SQUID MINIGAME 🦑"
          description="2720-5344-3341"
        />
        <FortniteMapsCard
          src="/TiltedSquidRoyale99Bots.jpeg"
          title="TILTED SQUID ROYALE 🏆"
          description="1116-7765-9076"
          
        />
        <FortniteMapsCard
          src="/WinterfestDemonHuntersGunGame.jpeg"
          title="❄️ WINTERFEST DEMON HUNTERS"
          description="6101-7751-8665"
        />
        <FortniteMapsCard
          src="/RedVsBluePlayersVsGuards.jpeg"
          title="RvB 🔴🔵 PLAYERS VS GUARDS"
          description="6263-5571-9595"
        />
      </div>
    </div>
  );
};

export default FortniteMaps;

// import React from "react";
// import FortniteMapsCard from "../sub/FortniteMapsCard";

// const FortniteMaps = () => {
//   return (
//     <div
//       className="flex flex-col items-center justify-center py-20"
//       id="fortnitemaps"
//     >
//       <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
//         <FortniteMapsCard
//           src="/MegaRampSurvival.jpeg"
//           title="TMNT MEGA RAMP SURVIVAL 🌆🐢"
//           description="0556-7584-6565"
//           url="https://www.fortnite.com/@nldevs/0556-7584-6565"
//         />

//         <FortniteMapsCard
//           src="/CityTMNT.jpeg"
//           title="TMNT CITY 🌆"
//           description="1383-6989-3967"
//           url="https://www.fortnite.com/@nldevs/1383-6989-3967"
//         />

//         <FortniteMapsCard
//           src="/RedVsBlueSquidMinigame.jpg"
//           title="RvB 🔴🔵 SQUID MINIGAME 🦑"
//           description="2720-5344-3341"
//           url="https://www.fortnite.com/@nldevs/2720-5344-3341"
//         />

//         <FortniteMapsCard
//           src="/TiltedSquidRoyale99Bots.jpeg"
//           title="TILTED SQUID ROYALE 🏆"
//           description="1116-7765-9076"
//           url="https://www.fortnite.com/@nldevs/1116-7765-9076"
//         />

//         <FortniteMapsCard
//           src="/WinterfestDemonHuntersGunGame.jpeg"
//           title="❄️ WINTERFEST DEMON HUNTERS"
//           description="6101-7751-8665"
//           url="https://www.fortnite.com/@nldevs/6101-7751-8665"
//         />

//         <FortniteMapsCard
//           src="/RedVsBluePlayersVsGuards.jpeg"
//           title="RvB 🔴🔵 PLAYERS VS GUARDS"
//           description="6263-5571-9595"
//           url="https://www.fortnite.com/@nldevs/6263-5571-9595"
//         />
//       </div>
//     </div>
//   );
// };

// export default FortniteMaps;

