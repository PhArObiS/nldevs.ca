
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
          src="/MegaRampSurvival.jpeg"
          title="MEGA RAMP SURVIVAL 🌆🐢 TMNT"
          description="https://www.fortnite.com/@nldevs/0556-7584-6565"
        />
        <FortniteMapsCard
          src="/CityTMNT.jpeg" 
          title="TMNT CITY 🌆 GUN GAME ONE SHOT 🎯"
          description="https://www.fortnite.com/@nldevs/1383-6989-3967"
        />
        <FortniteMapsCard
          src="/RedVsBlueSquidMinigame.jpg"
          title="RED VS BLUE 🔴🔵 SQUID MINIGAME 🦑"
          description="https://www.fortnite.com/@nldevs/2720-5344-3341"
        />
        <FortniteMapsCard
          src="/TiltedSquidRoyale99Bots.jpeg"
          title="TILTED SQUID ROYALE 🏆 99 BOTS"
          description="https://www.fortnite.com/@nldevs/1116-7765-9076"
        />
        <FortniteMapsCard
          src="/WinterfestDemonHuntersGunGame.jpeg"
          title="❄️ WINTERFEST DEMON HUNTERS 👿 GUNGAME"
          description="https://www.fortnite.com/@nldevs/6101-7751-8665"
        />
        <FortniteMapsCard
          src="/RedVsBluePlayersVsGuards.jpeg"
          title="RED VS BLUE 🔴🔵 PLAYERS VS GUARDS 🦑"
          description="https://www.fortnite.com/@nldevs/6263-5571-9595"
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
//       <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
//         FAVORITE FORTNITE MAPS
//       </h1>

//       <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
//         <FortniteMapsCard
//           src="/MegaRampSurvival.jpeg"
//           title="MEGA RAMP SURVIVAL 🌆🐢 TMNT"
//           url="https://www.fortnite.com/@nldevs/0556-7584-6565"
//         />

//         <FortniteMapsCard
//           src="/CityTMNT.jpeg"
//           title="TMNT CITY 🌆 GUN GAME ONE SHOT 🎯"
//           url="https://www.fortnite.com/@nldevs/1383-6989-3967"
//         />

//         <FortniteMapsCard
//           src="/RedVsBlueSquidMinigame.jpg"
//           title="RED VS BLUE 🔴🔵 SQUID MINIGAME 🦑"
//           url="https://www.fortnite.com/@nldevs/2720-5344-3341"
//         />

//         <FortniteMapsCard
//           src="/TiltedSquidRoyale99Bots.jpeg"
//           title="TILTED SQUID ROYALE 🏆 99 BOTS"
//           url="https://www.fortnite.com/@nldevs/1116-7765-9076"
//         />

//         <FortniteMapsCard
//           src="/WinterfestDemonHuntersGunGame.jpeg"
//           title="❄️ WINTERFEST DEMON HUNTERS 👿 GUNGAME"
//           url="https://www.fortnite.com/@nldevs/6101-7751-8665"
//         />

//         <FortniteMapsCard
//           src="/RedVsBluePlayersVsGuards.jpeg"
//           title="RED VS BLUE 🔴🔵 PLAYERS VS GUARDS 🦑"
//           url="https://www.fortnite.com/@nldevs/6263-5571-9595"
//         />
//       </div>
//     </div>
//   );
// };

// export default FortniteMaps;