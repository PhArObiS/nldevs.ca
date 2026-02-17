import Link from "next/link";

type Crumb = {
  href?: string;   // if omitted => current page (not clickable)
  label: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm flex flex-wrap gap-2 text-gray-300">
      {items.map((c, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <span key={`${c.label}-${idx}`} className="flex items-center gap-2">
            {c.href && !isLast ? (
              <Link href={c.href} className="underline hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-200" : "text-gray-300"}>{c.label}</span>
            )}

            {!isLast ? <span className="text-gray-500">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
