import { SOCIAL_LINKS } from "./site";

export const Socials = [
  {
    name: "Fortnite",
    src: "/epic-games-svgrepo-com.svg",
    href: SOCIAL_LINKS.fortnite,
  },
  {
    name: "Discord",
    src: "/discord.svg",
    href: SOCIAL_LINKS.discord,
  },
  {
    name: "YouTube",
    src: "/youtube-svgrepo-com.svg",
    href: SOCIAL_LINKS.youtube,
  },
  {
    name: "Email",
    src: "/gmail.png",
    href: SOCIAL_LINKS.email,
  },
  {
    name: "X",
    src: "/twitter-svgrepo-com.svg",
    href: SOCIAL_LINKS.x,
  },
] as const;
