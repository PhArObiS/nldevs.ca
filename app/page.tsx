import Link from "next/link";
import About from "@/components/main/About";
import FortniteMaps from "@/components/main/FortniteMaps";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <main className="h-full w-full">

      {/* ✅ SEO SCHEMA — HOMEPAGE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Favorite Fortnite Maps & Map Codes",
            description:
              "Curated list of Fortnite maps and map codes built with UEFN by NLDevs.",
            url: "https://www.nldevs.ca/",
            isPartOf: {
              "@type": "WebSite",
              name: "NLDevs",
              url: "https://www.nldevs.ca/",
            },
          }),
        }}
      />

      {/* PRIMARY SEO HEADER */}
      <section className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-white">
          Favorite Fortnite Maps & Map Codes
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-gray-300">
          Discover our favorite Fortnite maps built with Unreal Editor for Fortnite (UEFN).
          We showcase top-rated experiences including Gun Game modes, adventure maps,
          survival challenges, and unique custom creations designed for replayability
          and fun gameplay.
        </p>
      </section>

      {/* PAGE CONTENT */}
      <div className="flex flex-col gap-10">

        {/* ABOUT SECTION */}
        <About />

        {/* FEATURED MAPS SECTION */}
        <section id="featured-fortnite-maps" aria-label="Featured Fortnite Maps">
          <h2 className="text-3xl text-white text-center">
            Featured Fortnite Maps
          </h2>

          <p className="mt-3 text-center">
            <Link
              href="/maps"
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              Browse all maps →
            </Link>
          </p>

          <FortniteMaps />
        </section>

        {/* XP MAPS SECTION */}
        <section
          id="xp-maps"
          aria-label="Fortnite XP Maps"
          className="text-center px-6 pb-10"
        >
          <h2 className="text-2xl font-semibold text-white">
            Looking for XP Maps?
          </h2>

          <p className="mt-3 max-w-3xl mx-auto text-gray-300">
            Browse our best Fortnite XP maps and map codes to level up efficiently.
          </p>

          <Link
            href="/best-fortnite-xp-maps"
            className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200"
          >
            View Best Fortnite XP Maps →
          </Link>
        </section>

        <Footer />
      </div>
    </main>
  );
}


// // import Image from "next/image";
// import About from "@/components/main/About";
// import FortniteMaps from "@/components/main/FortniteMaps";
// // import FortniteResources from "@/components/main/FortniteResources";
// // import UnrealEngines from "@/components/main/UnrealEngines";
// import Skills from "@/components/main/Skills";
// // import ContactForm from "@/components/main/ContactForum";
// import Footer from "@/components/main/Footer";

// export default function Home() {
//   return (
//     <main className="h-full w-full">
//       <div className="flex flex-col gap-10">
//         <About />
//         { best-fortnite-xp-maps }
//         {/* <FortniteResources /> */}
//         {/* <UnrealEngines /> */}
//         {/* <Skills /> */}
//         {/* <ContactForm /> */}
//         <Footer />
        
//       </div>
//     </main>
//   );
// }
