/**
 * Renders structured data into the server HTML.
 *
 * Deliberately a plain <script> rather than next/script: next/script injects
 * its content on the client after hydration, so the JSON-LD never appears in
 * the initial HTML response. Crawlers that don't execute JavaScript — and
 * anything reading the raw document — would see no structured data at all.
 * This is the pattern the Next.js App Router docs recommend for JSON-LD.
 */
export default function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify output is escaped below to neutralise any "</script>"
      // sequence that could appear inside a string value.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
