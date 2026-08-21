import Link from "next/link";

/**
 * Root 404 for paths that never reach the [locale] tree.
 *
 * The middleware skips anything containing a dot (static assets, robots.txt,
 * the sitemaps). Those requests therefore bypass app/[locale]/layout.tsx,
 * and with no root layout to render into, a miss returned a 500 instead of a
 * 404 — including /ads.txt, which AdSense fetches.
 *
 * This is self-contained (its own html/body) because there is no root layout
 * above it.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#030014",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <p
            style={{
              color: "#22d3ee",
              letterSpacing: "0.2em",
              fontSize: 12,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: 40, margin: "12px 0 0" }}>Page not found</h1>
          <p style={{ color: "#c9c2e8", marginTop: 12 }}>
            That page does not exist.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 28,
              background: "#22d3ee",
              color: "#030014",
              fontWeight: 700,
              padding: "12px 20px",
              textDecoration: "none",
            }}
          >
            Back to NLDEVS
          </Link>
        </div>
      </body>
    </html>
  );
}
