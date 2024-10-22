// import Image from "next/image";
import About from "@/components/main/About";
// import FortniteMaps from "@/components/main/FortniteMaps";
// import FortniteResources from "@/components/main/FortniteResources";
// import UnrealEngines from "@/components/main/UnrealEngines";
// import Skills from "@/components/main/Skills";
// import ContactForm from "@/components/main/ContactForum";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-10">
        <About />
        {/* <FortniteMaps /> */}
        {/* <FortniteResources /> */}
        {/* <UnrealEngines /> */}
        {/* <Skills /> */}
        {/* <ContactForm /> */}
        <Footer />
        
      </div>
    </main>
  );
}
