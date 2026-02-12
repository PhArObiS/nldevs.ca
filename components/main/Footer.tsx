import React from "react";
import { FaYoutube } from "react-icons/fa";
import { RxDiscordLogo, RxGithubLogo } from "react-icons/rx";

type SocialLinkProps = {
  icon?: React.ReactNode;
  text: string;
  href?: string;
};

// const socialLinks: SocialLinkProps[] = [
  // { icon: <FaYoutube />, text: "YouTube", href: "https://youtube.com/@neely79" },
  // { icon: <RxGithubLogo />, text: "Github", href: "https://github.com" },
// ];

// const aboutLinks: SocialLinkProps[] = [
  // { icon: <RxDiscordLogo />, text: "LinkedIn", href: "https://linkedin.com" }
  // { text: "neil.lopes.79@gmail.com" },
// ];

const SocialLink: React.FC<SocialLinkProps> = ({ icon, text, href }) => (
  <a
    href={href || "#"}
    className="flex items-center my-3 text-gray-400 hover:text-white cursor-pointer"
    target={href ? "_blank" : "_self"}
    rel="noopener noreferrer"
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span className="text-sm font-mono">{text}</span>
  </a>
);

type SectionProps = {
  title: string;
  links: SocialLinkProps[];
};

const Section: React.FC<SectionProps> = ({ title, links }) => (
  <div className="min-w-[200px] flex flex-col items-center">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    {links.map((link, index) => (
      <SocialLink key={index} {...link} />
    ))}
  </div>
);

const Footer: React.FC = () => (
  <footer className="w-full bg-transparent text-gray-200 shadow-lg p-6">
    <div className="flex flex-wrap justify-around w-full max-w-4xl m-auto">
      {/* <Section title="Community" links={socialLinks} />
      <Section title="About" links={aboutLinks} /> */}
    </div>
    <div className="text-center text-sm text-gray-400 mt-6">
      <a
              href="https://www.fortnite.com/@nldevs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              &copy; NLDEVS 2026
            </a>
      
    </div>
  </footer>
);

export default Footer;
