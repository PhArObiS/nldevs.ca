import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nldevs.ca\ | Favorite Fortnite Maps",
  description: "These are our favorite fortnite maps. We are a passionate team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      // <body className={"${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden"}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        </body>
    </html>
  )
}
