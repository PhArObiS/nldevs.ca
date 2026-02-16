
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
  description: string;
  mode?: string;
  href?: string;
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
        <h3 className="text-2xl font-semibold text-white">{title}</h3>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(description);
          }}
          className="mt-2 text-left text-gray-300 hover:text-cyan-300 transition-colors"
        >
          <span className="font-semibold text-white">Map Code:</span>{" "}
          {description} <span className="text-gray-500 text-sm">(click to copy)</span>
        </button>

        {mode && (
          <p className="text-gray-400 text-sm mt-1">Mode: {mode}</p>
        )}
      </div>
    </article>
  );

  return href ? <Link href={href}>{card}</Link> : card;
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
