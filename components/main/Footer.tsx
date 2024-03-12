import React from "react";
import { FaYoutube } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
} from "react-icons/rx";

const SocialLink = ({ icon, text }) => (
  <p className="flex flex-row items-center my-[15px] cursor-pointer">
    {icon}
    <span className="text-[15px] ml-[6px] font-mono text-gray-400">{text}</span>
  </p>
);

const Footer = () => {
  return (
    <footer className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">

          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <h2 className="font-bold text-[16px]">Community</h2>
            <SocialLink icon={<FaYoutube />} text="Youtube" />
            <SocialLink icon={<RxGithubLogo />} text="Github" />
          </div>

          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <h2 className="font-bold text-[16px]">About</h2>
            <SocialLink icon={<RxDiscordLogo />} text="Linkedin" />
            <SocialLink text="neil.lopes.79@gmail.com" />
          </div>

        </div>

        <div className="mb-[20px] text-[15px] text-center font-mono text-gray-400">
          &copy; NetCube 2024 Inc. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
