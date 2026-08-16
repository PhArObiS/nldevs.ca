"use client";

// Locale-aware usePathname: returns the path with the locale prefix already
// stripped, so this check works identically on /admin and /fr/admin.
import { usePathname } from "@/i18n/navigation";
import Footer from "./Footer";

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}
