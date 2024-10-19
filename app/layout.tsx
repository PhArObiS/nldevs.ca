import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NL DEVS",
  description: "We are a passionate team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe. From designing unique maps and crafting immersive gameplay mechanics to integrating dynamic visual effects, we push the boundaries of what&apos;s possible within the Fortnite creative space."
  // Whether you're looking for custom maps, game modes, or specialized effects, our team combines technical expertise with artistic vision to deliver top-tier content that stands out. Join us on this creative journey and explore the limitless potential of UEFN with us."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden"}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        </body>
    </html>
  )
}
