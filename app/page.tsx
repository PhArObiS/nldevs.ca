
import Link from "next/link";
import Script from "next/script";
import About from "@/components/main/About";
import FortniteMaps from "@/components/main/FortniteMaps";
import Footer from "@/components/main/Footer";

const SITE_URL = "https://www.nldevs.ca";

const featuredMaps = [
  {
    title: "TMNT Mega Ramp Survival",
    code: "0556-7584-6565",
    image: "/MegaRampSurvival.jpeg",
    category: "TMNT / Survival",
    notes: "High-speed ramp survival with TMNT vibes and replayable runs.",
  },
  {
    title: "TMNT City",
    code: "1383-6989-3967",
    image: "/CityTMNT.jpeg",
    category: "TMNT / Experience",
    notes: "Explore a TMNT-themed city experience built in UEFN.",
  },
  {
    title: "RvB Squid Minigame",
    code: "2720-5344-3341",
    image: "/RedVsBlueSquidMinigame.jpg",
    category: "Squid Game / RvB",
    notes: "Squid-style minigames with fast rounds and team chaos.",
  },
  {
    title: "Tilted Squid Royale (99 Bots)",
    code: "1116-7765-9076",
    image: "/TiltedSquidRoyale99Bots.jpeg",
    category: "Squid Game / Battle Royale",
    notes: "Tilted battle royale with bots — great for practice and quick wins.",
  },
  {
    title: "Winterfest Demon Hunters",
    code: "6101-7751-8665",
    image: "/WinterfestDemonHuntersGunGame.jpeg",
    category: "Gun Game / FFA",
    notes: "Holiday demon-hunting gun game with weapon rotations and repeat loops.",
  },
  {
    title: "RvB Players vs Guards",
    code: "6263-5571-9595",
    image: "/RedVsBluePlayersVsGuards.jpeg",
    category: "RvB / PvP",
    notes: "Team-based action with guards — good for longer sessions.",
  },
];

export default function Home() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Favorite Fortnite Maps & Map Codes",
    description:
      "Curated list of Fortnite maps and map codes built with Unreal Editor for Fortnite (UEFN) by NLDevs.",
    url: `${SITE_URL}/`,
    isPartOf: {
      "@type": "WebSite",
      name: "NLDevs",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NLDevs",
      url: SITE_URL,
      // Optional: add logo if you have a stable absolute URL
      // logo: `${SITE_URL}/NavLogo.png`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Featured Fortnite Maps",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: featuredMaps.length,
      itemListElement: featuredMaps.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoGame",
          name: m.title,
          gamePlatform: "Fortnite",
          genre: m.category,
          description: `Fortnite map code: ${m.code}. ${m.notes}`,
          url: `${SITE_URL}/#${m.code.replaceAll("-", "")}`,
          image: `${SITE_URL}${m.image}`,
          publisher: {
            "@type": "Organization",
            name: "NLDevs",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  // OPTIONAL but strong: small FAQ for long-tail queries
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I play a Fortnite map code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open Fortnite → Search/Discover, enter the map code (####-####-####), then join the island.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best Fortnite XP maps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "XP maps vary by update and calibration. We keep a curated list of efficient XP maps on our Best Fortnite XP Maps page.",
        },
      },
      {
        "@type": "Question",
        name: "Are these maps made with UEFN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — our maps are built with Unreal Editor for Fortnite (UEFN) with a focus on replayability and fun gameplay loops.",
        },
      },
    ],
  };

  return (
    <main className="h-full w-full">
      {/* ✅ JSON-LD (preferred in Next.js) */}
      <Script id="homepage-schema" type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </Script>
      <Script id="homepage-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* PRIMARY SEO HEADER */}
      <section className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-white">
          Favorite Fortnite Maps &amp; Map Codes
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-gray-300">
          Discover our favorite Fortnite maps built with Unreal Editor for Fortnite (UEFN).
          We showcase top-rated experiences including Gun Game modes, adventure maps,
          survival challenges, and unique custom creations designed for replayability
          and fun gameplay.
        </p>

        {/* ✅ Internal crawl hub (helps Google + users) */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/tmnt-fortnite-maps"
            className="rounded-full border border-[#2A0E61] px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition"
          >
            TMNT Maps
          </Link>
          <Link
            href="/squid-game-fortnite-maps"
            className="rounded-full border border-[#2A0E61] px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition"
          >
            Squid Game Maps
          </Link>
          <Link
            href="/fortnite-gun-game-maps"
            className="rounded-full border border-[#2A0E61] px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition"
          >
            Gun Game Maps
          </Link>
          <Link
            href="/best-fortnite-xp-maps"
            className="rounded-full border border-[#2A0E61] px-4 py-2 text-gray-200 hover:text-white hover:bg-white/5 transition"
          >
            XP Maps
          </Link>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <div className="flex flex-col gap-10">
        {/* ABOUT SECTION */}
        <section id="about" aria-label="About NLDevs">
          <About />
        </section>

        {/* FEATURED MAPS SECTION */}
        <section id="featured-fortnite-maps" aria-label="Featured Fortnite Maps">
          <h2 className="text-3xl text-white text-center">Featured Fortnite Maps</h2>

          <p className="mt-3 text-center">
            <a
              href="https://www.fortnite.com/@nldevs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition duration-300"
            >
              Browse all maps on Fortnite.com →
            </a>
          </p>

          {/* Optional: anchor targets for schema URLs */}
          <div className="sr-only">
            {featuredMaps.map((m) => (
              <span key={m.code} id={m.code.replaceAll("-", "")}>
                {m.title}
              </span>
            ))}
          </div>

          <FortniteMaps />
        </section>

        {/* XP MAPS SECTION */}
        <section id="xp-maps" aria-label="Fortnite XP Maps" className="text-center px-6 pb-10">
          <h2 className="text-2xl font-semibold text-white">Looking for XP Maps?</h2>

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

        {/* Small FAQ content (matches schema; adds real on-page text) */}
        <section id="faq" aria-label="Frequently asked questions" className="px-6 pb-10 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <div className="mt-4 grid gap-4">
            <div className="rounded-lg border border-[#2A0E61] p-4">
              <h3 className="font-semibold text-white">How do I play a Fortnite map code?</h3>
              <p className="mt-2 text-gray-300">
                Open Fortnite → Search/Discover, enter the map code (####-####-####), then join the island.
              </p>
            </div>
            <div className="rounded-lg border border-[#2A0E61] p-4">
              <h3 className="font-semibold text-white">What are the best Fortnite XP maps?</h3>
              <p className="mt-2 text-gray-300">
                XP maps can change with updates and calibration. We keep a curated list on our{" "}
                <Link href="/best-fortnite-xp-maps" className="underline text-cyan-300 hover:text-cyan-200">
                  Best Fortnite XP Maps
                </Link>{" "}
                page.
              </p>
            </div>
            <div className="rounded-lg border border-[#2A0E61] p-4">
              <h3 className="font-semibold text-white">Are these maps made with UEFN?</h3>
              <p className="mt-2 text-gray-300">
                Yes — our maps are built with Unreal Editor for Fortnite (UEFN) with a focus on replayability.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}


// import Link from "next/link";
// import About from "@/components/main/About";
// import FortniteMaps from "@/components/main/FortniteMaps";
// import Footer from "@/components/main/Footer";

// export default function Home() {
//   return (
//     <main className="h-full w-full">

//       {/* ✅ SEO SCHEMA — HOMEPAGE */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "CollectionPage",
//             name: "Favorite Fortnite Maps & Map Codes",
//             description:
//               "Curated list of Fortnite maps and map codes built with UEFN by NLDEVS.",
//             url: "https://www.nldevs.ca/",
//             isPartOf: {
//               "@type": "WebSite",
//               name: "NLDEVS",
//               url: "https://www.nldevs.ca/",
              
//             },
//           }),
//         }}
//       />

//       {/* PRIMARY SEO HEADER */}
//       <section className="text-center py-12 px-6">
//         <h1 className="text-4xl font-bold text-white">
//           Favorite Fortnite Maps & Map Codes
//         </h1>

//         <p className="mt-4 max-w-3xl mx-auto text-gray-300">
//           Discover our favorite Fortnite maps built with Unreal Editor for Fortnite (UEFN).
//           We showcase top-rated experiences including Gun Game modes, adventure maps,
//           survival challenges, and unique custom creations designed for replayability
//           and fun gameplay.
//         </p>
//       </section>

//       {/* PAGE CONTENT */}
//       <div className="flex flex-col gap-10">

//         {/* ABOUT SECTION */}
//         <About />

//         {/* FEATURED MAPS SECTION */}
//         <section id="featured-fortnite-maps" aria-label="Featured Fortnite Maps">
//           <h2 className="text-3xl text-white text-center">
//             Featured Fortnite Maps
//           </h2>

//           <p className="mt-3 text-center">
//             <Link href="https://www.fortnite.com/@nldevs"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block text-blue-400 hover:text-blue-300 underline transition duration-300">
//               Browse all maps →
//             </Link>

//           </p>

//           <FortniteMaps />
//         </section>

//         {/* XP MAPS SECTION */}
//         <section
//           id="xp-maps"
//           aria-label="Fortnite XP Maps"
//           className="text-center px-6 pb-10"
//         >
//           <h2 className="text-2xl font-semibold text-white">
//             Looking for XP Maps?
//           </h2>

//           <p className="mt-3 max-w-3xl mx-auto text-gray-300">
//             Browse our best Fortnite XP maps and map codes to level up efficiently.
//           </p>

//           <Link
//             href="/best-fortnite-xp-maps"
//             className="inline-block mt-4 text-cyan-300 underline hover:text-cyan-200"
//           >
//             View Best Fortnite XP Maps →
//           </Link>
//         </section>

//         <Footer />
//       </div>
//     </main>
//   );
// }


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


