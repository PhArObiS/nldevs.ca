
export enum XPMapType {
  AFK = "AFK",
  Active = "Active",
  Mixed = "Mixed",
}

export enum XPMapMode {
  Gungame = "Gungame",
  TeamDeathmatch = "Team Deathmatch",
  Survival = "Survival",
  BattleRoyaleBots = "Battle Royale (Bots)",
  AdventureCity = "Adventure / City",
  RedVsBlue = "Red vs Blue",
  Minigames = "Minigames",
}

export type FortniteXPMap = {
  title: string;
  code: string;
  slug: string;

  // Optional so your build/UI won’t break if you add a map before you have art
  image?: string;

  // XP behavior (how you earn XP)
  xpType: XPMapType;

  // Gameplay category (what kind of map it is)
  mode?: XPMapMode;

  // Short human summary shown on the card
  notes: string;
};

export const xpMaps: FortniteXPMap[] = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    slug: "tmnt-mega-ramp-survival",
    image: "/MegaRampSurvival.jpeg",
    xpType: XPMapType.Active,
    mode: XPMapMode.Survival,
    notes: "Good XP from survival rounds.",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    slug: "winterfest-demon-hunters",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    xpType: XPMapType.Mixed,
    mode: XPMapMode.Gungame,
    notes: "Combat XP and repeatable loops.",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    slug: "rvb-players-vs-guards",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    xpType: XPMapType.Mixed,
    mode: XPMapMode.TeamDeathmatch,
    notes: "Team-based XP loops; good for longer sessions.",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    slug: "tilted-squid-royale-99-bots",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    xpType: XPMapType.Active,
    mode: XPMapMode.BattleRoyaleBots,
    notes: "Mostly AFK-style XP while bots keep the match moving.",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    slug: "rvb-squid-minigame",
    image: "/RedVsBlueSquidMinigame.jpg",
    xpType: XPMapType.Active,
    mode: XPMapMode.Minigames,
    notes: "Fast rounds; good XP when you keep playing objectives.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    slug: "tmnt-city",
    image: "/CityTMNT.jpeg",
    xpType: XPMapType.Active,
    mode: XPMapMode.Gungame,
    notes: "Good XP from exploration + combat routes.",
  },
];