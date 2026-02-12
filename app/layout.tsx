import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nldevs.ca/"), 
  title: {
    default: "Favorite Fortnite Maps | NLDevs",
    template: "%s | NLDevs",
  },
  description:
    "Favorite Fortnite maps created by NLDevs. Discover UEFN experiences, map codes, and gameplay highlights.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Favorite Fortnite Maps | NLDevs",
    description:
      "Favorite Fortnite maps created by NLDevs — UEFN experiences, map codes, and highlights.",
    siteName: "NLDevs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorite Fortnite Maps | NLDevs",
    description:
      "Favorite Fortnite maps created by NLDevs — UEFN experiences, map codes, and highlights.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <StarsCanvas />
        <Navbar />
        {children}
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import StarsCanvas from "@/components/main/StarBackground";
// import Navbar from "@/components/main/Navbar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "nldevs.ca\ | Favorite Fortnite Maps",
//   description: "These are our favorite fortnite maps. We are a passionate team of game developers and creative minds specializing in Unreal Editor for Fortnite (UEFN). Our mission is to bring innovative, interactive, and visually stunning experiences to the Fortnite universe."
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
//       // <body className={"${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden"}
//       >
//         <StarsCanvas />
//         <Navbar />
//         {children}
//         </body>
//     </html>
//   )
// }
