// components/sub/FortniteMapsCard.tsx
import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string; // map code
  mode?: string;
  href?: string; // optional: make entire card clickable
}

const FortniteMapsCard = ({ src, title, description, mode, href }: Props) => {
  const card = (
    <article className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] hover:border-cyan-400 hover:shadow-2xl hover:scale-[1.02] transition-all">
      <Image
        src={src}
        alt={`${title} Fortnite map gameplay preview`}
        width={1000}
        height={1000}
        loading="lazy"
        className="w-full object-contain"
      />

      <div className="relative p-4">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-white">{title}</h3>

        {/* Map Code (click to copy) */}
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(description)}
          className="mt-2 text-left text-gray-300 hover:text-cyan-300 transition-colors"
          aria-label={`Copy map code ${description} for ${title}`}
          title="Click to copy map code"
        >
          <span className="font-semibold text-white">Map Code:</span>{" "}
          {description}{" "}
          <span className="text-gray-500 text-sm">(click to copy)</span>
        </button>

        {/* Mode */}
        {mode ? <p className="text-gray-400 text-sm mt-1">Mode: {mode}</p> : null}
      </div>
    </article>
  );

  // If href provided, make the whole card clickable
  return href ? (
    <a href={href} className="block" aria-label={`Open ${title}`}>
      {card}
    </a>
  ) : (
    card
  );
};

export default FortniteMapsCard;


// import Image from "next/image";
// import React from "react";

// interface Props {
//   src: string;
//   title: string;
//   description: string;
// }

// const FortniteMapsCard = ({ src, title, description }: Props) => {
//   return (
//     <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">
//       <Image
//         src={src}
//         alt={title}
//         width={1000}
//         height={1000}
//         className="w-full object-contain"
//       />

//       <div className="relative p-4">
//         <h1 className="text-2xl font-semibold text-white">{title}</h1>
//         <p className="mt-2 text-gray-300">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default FortniteMapsCard;


// import Image from "next/image";
// import React from "react";

// interface Props {
//   src: string;
//   title: string;
//   description: string;
//   url: string;
// }

// const FortniteMapsCard = ({ src, title, description, url }: Props) => {
//   return (
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block relative z-10"
//     >
//       <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
//         <Image
//           src={src}
//           alt={title}
//           width={1000}
//           height={1000}
//           className="w-full object-contain"
//         />
//         <div className="relative p-4">
//           <h1 className="text-2xl font-semibold text-white">{title}</h1>
//           <p className="mt-2 text-gray-300">{description}</p>
//           {/* <p className="mt-2 text-cyan-300 underline">Open map page</p> */}
//         </div>
//       </div>
//     </a>
//   );
// };

// export default FortniteMapsCard;
