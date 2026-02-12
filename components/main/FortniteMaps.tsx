
import React from "react";
import FortniteMapsCard from "../sub/FortniteMapsCard";

const maps = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    mode: "Mega Ramp / Survival",
    slug: "tmnt-mega-ramp-survival",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    mode: "Adventure / City",
    slug: "tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    mode: "Red vs Blue / Minigames",
    slug: "rvb-squid-minigame",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    mode: "Battle Royale / Bots",
    slug: "tilted-squid-royale-99-bots",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "Gun Game / Seasonal",
    slug: "winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    mode: "Red vs Blue",
    slug: "rvb-players-vs-guards",
  },
];

const FortniteMaps = () => {
  // ✅ JSON-LD: ItemList of maps
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Favorite Fortnite Maps",
    description:
      "A created list of favorite Fortnite maps created by NLDevs with map codes and highlights.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: maps.length,
    itemListElement: maps.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoGame",
        name: m.title,
        gamePlatform: "Fortnite",
        genre: m.mode,
        description: `Fortnite map code: ${m.code}. Mode: ${m.mode}.`,
        image: `https://www.nldevs.ca${m.image}`,
        publisher: {
          "@type": "Organization",
          name: "NLDevs",
          url: "https://www.nldevs.ca",
        },
        // Optional: add this later when you create dedicated pages
        // url: `https://www.nldevs.ca/maps/${m.slug}`,
      },
    })),
  };

  return (
    <section
      className="flex flex-col items-center justify-center py-20"
      id="fortnitemaps"
      aria-label="Favorite Fortnite Maps list"
    >
      {/* ✅ JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <h2 className="text-[34px] md:text-[40px] font-mono font-semibold text-white py-10">
        Favorite Fortnite Maps (Map Codes)
      </h2>

      <p className="text-gray-300 max-w-3xl text-center px-6 mb-10">
        Browse our favorite Fortnite maps and jump in fast using the map codes.
        {/* Each map includes a quick overview so you know what to expect before you play. */}
      </p>

      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        {maps.map((m) => (
          <FortniteMapsCard
            key={m.code}
            src={m.image}
            title={m.title}
            description={m.code}
            mode={m.mode}
          />
        ))}
      </div>
    </section>
  );
};

export default FortniteMaps;

// import React from "react";
// import FortniteMapsCard from "../sub/FortniteMapsCard";

// const FortniteMaps = () => {
//   return (
//     <section
//       className="flex flex-col items-center justify-center py-20"
//       id="fortnitemaps"
//       aria-label="Favorite Fortnite Maps list"
//     >
//       <h2 className="text-[34px] md:text-[40px] font-mono font-semibold text-white py-10">
//         Favorite Fortnite Maps (Map Codes)
//       </h2>

//       <p className="text-gray-300 max-w-3xl text-center px-6 mb-10">
//         Browse our favorite Fortnite maps and jump in fast using the map codes.
//         Each map includes a quick overview so you know what to expect before you play.
//       </p>

//       <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
//         <FortniteMapsCard
//           src="/MegaRampSurvival.jpeg"
//           title="TMNT Mega Ramp Survival"
//           description="0556-7584-6565"
//           mode="Mega Ramp / Survival"
//         />
//         <FortniteMapsCard
//           src="/CityTMNT.jpeg"
//           title="TMNT City"
//           description="1383-6989-3967"
//           mode="Adventure / City"
//         />
//         <FortniteMapsCard
//           src="/RedVsBlueSquidMinigame.jpg"
//           title="RvB Squid Minigame"
//           description="2720-5344-3341"
//           mode="Red vs Blue / Minigames"
//         />
//         <FortniteMapsCard
//           src="/TiltedSquidRoyale99Bots.jpeg"
//           title="Tilted Squid Royale (99 Bots)"
//           description="1116-7765-9076"
//           mode="Battle Royale / Bots"
//         />
//         <FortniteMapsCard
//           src="/WinterfestDemonHuntersGunGame.jpeg"
//           title="Winterfest Demon Hunters"
//           description="6101-7751-8665"
//           mode="Gun Game / Seasonal"
//         />
//         <FortniteMapsCard
//           src="/RedVsBluePlayersVsGuards.jpeg"
//           title="RvB Players vs Guards"
//           description="6263-5571-9595"
//           mode="Red vs Blue"
//         />
//       </div>
//     </section>
//   );
// };

// export default FortniteMaps;

// import React from "react";
// import FortniteMapsCard from "../sub/FortniteMapsCard";

// const FortniteMaps = () => {
//   return (
//     <div className="flex flex-col items-center justify-center py-20" id="fortnitemaps">
//       {/* <h2 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
//       FAVORITE FORTNITE MAPS
//       </h2> */}
//       <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
//         <FortniteMapsCard
//           src="/MegaRampSurvival.jpeg"
//           title="TMNT MEGA RAMP SURVIVAL 🌆🐢"
//           description="0556-7584-6565"
//         />
//         <FortniteMapsCard
//           src="/CityTMNT.jpeg" 
//           title="TMNT CITY 🌆"
//           description="1383-6989-3967"
//         />
//         <FortniteMapsCard
//           src="/RedVsBlueSquidMinigame.jpg"
//           title="RvB 🔴🔵 SQUID MINIGAME 🦑"
//           description="2720-5344-3341"
//         />
//         <FortniteMapsCard
//           src="/TiltedSquidRoyale99Bots.jpeg"
//           title="TILTED SQUID ROYALE 🏆"
//           description="1116-7765-9076"
          
//         />
//         <FortniteMapsCard
//           src="/WinterfestDemonHuntersGunGame.jpeg"
//           title="❄️ WINTERFEST DEMON HUNTERS"
//           description="6101-7751-8665"
//         />
//         <FortniteMapsCard
//           src="/RedVsBluePlayersVsGuards.jpeg"
//           title="RvB 🔴🔵 PLAYERS VS GUARDS"
//           description="6263-5571-9595"
//         />
//       </div>
//     </div>
//   );
// };

// export default FortniteMaps;

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

