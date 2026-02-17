import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.nldevs.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "NLDEVS — UEFN Game Studio",
    template: "%s | NLDEVS",
  },

  description:
    "NLDEVS is a UEFN game studio building Fortnite experiences. Explore our games, island codes, screenshots, and gameplay highlights.",

  keywords: [
    "NLDEVS",
    "UEFN",
    "Fortnite maps",
    "Fortnite island codes",
    "Fortnite experiences",
    "Gun Game maps",
    "XP maps",
    "TMNT Fortnite maps",
    "Squid Game Fortnite maps",
  ],

  // ✅ AdSense verification meta tag
  verification: {
    other: {
      "google-adsense-account": "ca-pub-4592429005404942",
    },
  },

  alternates: { canonical: "/" },

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
    url: SITE_URL,
    title: "NLDEVS — UEFN Game Studio",
    description:
      "NLDEVS builds Fortnite experiences with UEFN. Explore our games and island codes.",
    siteName: "NLDEVS",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "NLDEVS — UEFN Game Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NLDEVS — UEFN Game Studio",
    description:
      "NLDEVS builds Fortnite experiences with UEFN. Explore our games and island codes.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Global JSON-LD (best place: layout)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NLDEVS",
    url: SITE_URL,
    description: "UEFN game studio building Fortnite experiences.",
    sameAs: [
      "https://www.fortnite.com/@nldevs",
      "https://www.youtube.com/@nldevs",
      "https://x.com/nldevsmtl",
      "https://discord.gg/V2MEqa69",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NLDEVS",
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: "NLDEVS",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        {/* ✅ Global structured data */}
        <Script id="nldevs-org-schema" type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </Script>
        <Script id="nldevs-website-schema" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>

        {/* ✅ AdSense site-wide script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4592429005404942"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ✅ Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2ZT17ZYFDX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZT17ZYFDX');
          `}
        </Script>

        {/* Background — must not capture clicks */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <StarsCanvas />
        </div>

        <Navbar />

        {/* Offset for fixed navbar */}
        <div className="pt-[85px]">{children}</div>
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
