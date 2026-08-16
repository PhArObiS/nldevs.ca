import React from "react";
import { useFormatter, useTranslations } from "next-intl";
import FortniteMapsCard from "../sub/FortniteMapsCard";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { FEATURED_MAP_IDS, MAPS } from "@/constants/maps";

/**
 * Renders the featured map grid from the shared map registry. The ItemList
 * JSON-LD for these maps is emitted once by the homepage — do not duplicate
 * it here.
 */
const FortniteMaps = () => {
  const t = useTranslations("modes");
  const format = useFormatter();

  return (
    <RevealGroup
      className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      stagger={0.07}
    >
      {FEATURED_MAP_IDS.map((id, i) => {
        const m = MAPS[id];
        // Stored as ISO year-month and formatted here, so "August 2026"
        // becomes "août 2026" / "agosto de 2026" without a second data entry.
        const updated = format.dateTime(new Date(`${m.updated}-01T12:00:00Z`), {
          month: "long",
          year: "numeric",
        });

        return (
          <RevealItem key={m.code} className="h-full">
            <FortniteMapsCard
              src={m.image}
              title={m.title}
              code={m.code}
              mode={t(m.mode)}
              status={m.status}
              updated={updated}
              href={m.href}
              priority={i < 3}
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
};

export default FortniteMaps;
