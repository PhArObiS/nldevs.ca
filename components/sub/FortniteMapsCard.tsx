

import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  url: string;
}

const FortniteMapsCard = ({ src, title, description, url }: Props) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative z-10"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-contain"
        />
        <div className="relative p-4">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-gray-300">{description}</p>
          {/* <p className="mt-2 text-cyan-300 underline">Open map page</p> */}
        </div>
      </div>
    </a>
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