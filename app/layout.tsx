import type { ReactNode } from "react";

/**
 * Pass-through root layout.
 *
 * The real layout (html, body, providers, chrome) is app/[locale]/layout.tsx.
 * This exists only so Next has a root to render app/not-found.tsx into —
 * without it, any path the middleware skips (anything containing a dot, e.g.
 * a missing /ads.txt) returned a 500 instead of a 404.
 *
 * It deliberately renders no html/body: those come from whichever layout
 * below it handles the request.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
