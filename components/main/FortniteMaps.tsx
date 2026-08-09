import React from "react";
import FortniteMapsCard from "../sub/FortniteMapsCard";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const maps = [
  {
    title: "Star Wars Tycoon Sidekick Legends",
    code: "3205-2388-4588",
    image: "/TycoonSidekicks.jpg",
    mode: "Coming Soon",
    status: "Testing",
    updated: "August 2026",
    slug: "star-wars-tycoon-sidekick-legends",
  },
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    mode: "Survival",
    status: "Live",
    updated: "August 2026",
    slug: "tmnt-mega-ramp-survival",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpg",
    mode: "Adventure",
    status: "Live",
    updated: "August 2026",
    slug: "tmnt-city",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    mode: "Minigames",
    status: "Live",
    updated: "August 2026",
    slug: "rvb-squid-minigame",
  },
  {
    title: "99 Bots Squid Royale Boss",
    code: "0596-3765-4845",
    image: "/99 Bots Squid Royale Boss.jpg",
    mode: "99 Bots",
    status: "Live",
    updated: "July 2026",
    slug: "99-bots-squid-royale-boss",
  },
  {
    title: "Sidekick Siege 99 Bots",
    code: "5577-7953-8449",
    image: "/Squid99BotsSidekicks.jpg",
    mode: "Sidekicks",
    status: "Live",
    updated: "August 2026",
    slug: "sidekick-siege-99-bots",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    mode: "Gun Game",
    status: "Live",
    updated: "August 2026",
    slug: "winterfest-demon-hunters",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    mode: "Red vs Blue",
    status: "Live",
    updated: "August 2026",
    // No detail page yet — card renders without a link.
    slug: null,
  },
] as const;

/**
 * Renders the featured map grid. The ItemList JSON-LD for these maps is emitted
 * once by app/page.tsx — do not duplicate it here.
 */
const FortniteMaps = () => {
  return (
    <RevealGroup
      className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      stagger={0.07}
    >
      {maps.map((m, i) => (
        <RevealItem key={m.code} className="h-full">
          <FortniteMapsCard
            src={m.image}
            title={m.title}
            code={m.code}
            mode={m.mode}
            status={m.status}
            updated={m.updated}
            href={m.slug ? `/${m.slug}` : undefined}
            priority={i < 3}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
};

export default FortniteMaps;
