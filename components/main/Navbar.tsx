import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="code">
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
          <a href="/" className="h-auto w-auto flex flex-row items-center">
            <Image
              src="/NavLogo.png"
              alt="logo"
              width={40}
              height={40}
              className="cursor-pointer hover:animate-slowspin"
            />
            <span className="font-bold ml-[10px] hidden md:block text-gray-300">
              nldevs
            </span>
          </a>

          {/* Adjusted navbar section */}
          {/* <div className="flex flex-row items-center justify-between w-full max-w-[500px] h-full md:mr-20">
            <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] text-gray-200 ml-[15px]">
              <a href="" className="cursor-pointer">
                Fortnite
              </a>
              <a href="" className="cursor-pointer">
                Creative
              </a>
              <a href="" className="cursor-pointer">
                Team
              </a>
            </div>
          </div> */}

          {/* Social Icons with Links */}
          <div className="flex flex-row gap-2">
            {Socials.map((social) => (
              <a
                key={social.name}
                href={
                  social.name === "Discord"
                    ? "https://discord.gg/V2MEqa69"
                    : social.name === "Youtube"
                    ? "https://www.youtube.com/@nldevs"
                    : social.name === "Gmail"
                    ? "mailto:nldevsmtl@gmail.com"
                    : social.name === "Instagram"
                    ? "https://www.instagram.com/nldevs/"
                    : social.name === "Facebook"
                    ? "https://www.facebook.com/profile.php?id=100069258844412&sk=about"
                    : social.name === "TikTok"
                    ? "https://www.tiktok.com/@nldevs"
                    : social.name === "Twitter"
                    ? "https://x.com/nldevsmtl" 
                    : social.name === "Fortnite"
                    ? "https://www.fortnite.com/@nldevs"  
                    : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </a>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
