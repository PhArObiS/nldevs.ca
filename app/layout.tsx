import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import ClientLoginModal from "@/components/main/ClientLoginModal";
import SiteFooter from "@/components/main/SiteFooter";
import { SAME_AS, SITE_LOGO_URL, SITE_URL } from "@/constants/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "NLDEVS",
  category: "gaming",

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
        url: SITE_LOGO_URL,
        width: 250,
        height: 250,
        alt: "NLDEVS logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NLDEVS — UEFN Game Studio",
    description:
      "NLDEVS builds Fortnite experiences with UEFN. Explore our games and island codes.",
    images: [SITE_LOGO_URL],
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
    alternateName: "NLDEVS UEFN Game Studio",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE_LOGO_URL,
      width: 250,
      height: 250,
    },
    image: SITE_LOGO_URL,
    description: "UEFN game studio building Fortnite experiences.",
    email: "nldevsmtl@gmail.com",
    sameAs: SAME_AS,
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
  };

  return (
    <html lang="en">
      <head>
        {/*
          Scroll-reveal elements are rendered at opacity 0 and animated in by
          framer-motion. With JS unavailable that animation never runs, so this
          forces them visible. Inline styles need !important to override.
        */}
        <noscript>
          <style>{`.js-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.className} bg-ink text-gray-200 overflow-x-hidden antialiased`}
      >
        {/* ✅ Global structured data */}
        <JsonLd id="nldevs-org-schema" data={orgSchema} />
        <JsonLd id="nldevs-website-schema" data={websiteSchema} />

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

        {/* Background — StarsCanvas provides its own fixed, click-through wrapper */}
        <StarsCanvas />

        <Navbar />
        <ClientLoginModal />

        {/*
          Offset for the fixed header. It is 65px on desktop; on mobile the
          quick-nav tab strip adds another ~52px underneath it.
        */}
        <div className="pt-[117px] md:pt-[65px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
