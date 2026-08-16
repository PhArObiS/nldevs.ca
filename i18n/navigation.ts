import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for next/link and next/navigation.
 *
 * Import `Link` from here rather than `next/link` anywhere inside app/ —
 * these resolve the per-locale slug automatically, so a link written as
 * href="/tmnt-city" renders as /pt/cidade-tartarugas-ninja under `pt`.
 *
 * `getPathname` is the server-side equivalent, used to build canonical URLs
 * and hreflang alternates in metadata.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
