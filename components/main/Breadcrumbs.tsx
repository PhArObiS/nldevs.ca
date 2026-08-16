import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export type Crumb = {
  /** Omit for the current page, which renders unclickable. */
  href?: AppPathname;
  label: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("common");

  return (
    <nav aria-label={t("breadcrumb")} className="text-sm text-gray-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
              {c.href && !isLast ? (
                // Locale-aware Link: resolves to the per-locale slug.
                <Link href={c.href} className="underline hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-gray-200" : "text-gray-300"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}

              {!isLast ? <span className="text-gray-500">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
