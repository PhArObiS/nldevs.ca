import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import "../globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import ClientLoginModal from "@/components/main/ClientLoginModal";
import SiteFooter from "@/components/main/SiteFooter";
import { SAME_AS, SITE_LOGO_URL, SITE_URL } from "@/constants/site";
import { LOCALE_META, locales, routing, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/i18n/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Pre-render all four locales at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const meta = LOCALE_META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "NLDEVS",
    category: "gaming",

    title: {
      default: t("siteTitle"),
      template: t("titleTemplate"),
    },

    description: t("siteDescription"),
    keywords: t("keywords").split("|"),

    // AdSense verification meta tag
    verification: {
      other: {
        "google-adsense-account": "ca-pub-4592429005404942",
      },
    },

    alternates: buildAlternates("/", locale),

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
      title: t("siteTitle"),
      description: t("ogDescription"),
      siteName: "NLDEVS",
      locale: meta.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => LOCALE_META[l].ogLocale),
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
      title: t("siteTitle"),
      description: t("ogDescription"),
      images: [SITE_LOGO_URL],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts this route tree into static rendering — without it every page
  // becomes dynamic the moment a translation is read.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });
  const meta = LOCALE_META[locale];

  // Global JSON-LD. `inLanguage` + `url` are locale-specific so each version
  // describes itself rather than pointing every locale at the English page.
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
    description: t("orgDescription"),
    email: "nldevsmtl@gmail.com",
    sameAs: SAME_AS,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NLDEVS",
    url: SITE_URL,
    inLanguage: meta.hreflang,
    publisher: {
      "@type": "Organization",
      name: "NLDEVS",
      url: SITE_URL,
    },
  };

  return (
    <html lang={meta.htmlLang}>
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
        {/* Global structured data */}
        <JsonLd id="nldevs-org-schema" data={orgSchema} />
        <JsonLd id="nldevs-website-schema" data={websiteSchema} />

        {/* AdSense site-wide script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4592429005404942"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2ZT17ZYFDX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZT17ZYFDX', {content_group: '${locale}'});
          `}
        </Script>

        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
