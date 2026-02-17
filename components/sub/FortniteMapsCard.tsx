
// import Image from "next/image";
// import React from "react";

// interface Props {
//   src: string;
//   title: string;
//   description: string;
//   mode?: string;
// }

// const FortniteMapsCard = ({ src, title, description, mode }: Props) => {
//   return (
//     <article className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">

//       <Image
//         src={src}
//         alt={`${title} Fortnite map gameplay preview`}
//         width={1000}
//         height={1000}
//         className="w-full object-contain"
//       />

//       <div className="relative p-4">

//         {/* Title */}
//         <h3 className="text-2xl font-semibold text-white">
//           {title}
//         </h3>

//         {/* Map Code */}
//         <p className="mt-2 text-gray-300">
//           <span className="font-semibold text-white">Map Code:</span>{" "}
//           {description}
//         </p>

//         {/* Mode */}
//         {mode && (
//           <p className="text-gray-400 text-sm mt-1">
//             Mode: {mode}
//           </p>
//         )}

//       </div>
//     </article>
//   );
// };

// export default FortniteMapsCard;

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  src: string;
  title: string;
  code: string;
  mode?: string;
  href?: string; // if provided, card becomes clickable
}

const FortniteMapsCard = ({ src, title, code, mode, href }: Props) => {
  const CardBody = (
    <article
      className={[
        "relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]",
        "transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-cyan-400",
        "focus-within:ring-2 focus-within:ring-cyan-400/60 focus-within:ring-offset-0",
      ].join(" ")}
    >
      <Image
        src={src}
        alt={`${title} Fortnite map gameplay preview`}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>

        <p className="mt-2 text-gray-300">
          <span className="font-semibold text-white">Map Code:</span> {code}
        </p>

        {mode ? (
          <p className="text-gray-400 text-sm mt-1">Mode: {mode}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="text-sm text-cyan-300 underline hover:text-cyan-200"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(code);
            }}
          >
            Copy code
          </button>

          {href ? (
            <span className="text-sm text-gray-400">View details →</span>
          ) : null}
        </div>
      </div>
    </article>
  );

  // If href exists, wrap in Link for full-card clickability
  if (href) {
    return (
      <Link href={href} className="block" aria-label={`Open ${title} details page`}>
        {CardBody}
      </Link>
    );
  }

  return CardBody;
};

export default FortniteMapsCard;
