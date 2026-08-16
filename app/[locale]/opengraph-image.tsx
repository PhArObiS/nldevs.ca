import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";

export const alt = "NLDEVS — UEFN Game Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** One image per locale, generated at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Generated at build time, so there is no binary asset to keep in sync.
 * Applies to every route that does not define its own openGraph image.
 *
 * Localized: this card is what renders when someone shares a page to Discord,
 * X, or WhatsApp, so a French page shared into a French server should not
 * preview in English.
 */
export default async function OpengraphImage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 88px",
          background: "#030014",
          position: "relative",
        }}
      >
        {/* Neon corner washes */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.30) 0%, rgba(3,0,20,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(233,53,193,0.28) 0%, rgba(3,0,20,0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#22d3ee",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {t("ogImageEyebrow")}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            color: "white",
            letterSpacing: -4,
            marginTop: 12,
          }}
        >
          NLDEVS
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#c9c2e8",
            marginTop: 16,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {t("ogImageTagline")}
        </div>

        {/* Neon underline */}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 360,
            height: 8,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 50%, #e935c1 100%)",
          }}
        />
      </div>
    ),
    size
  );
}
