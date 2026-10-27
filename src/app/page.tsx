
import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Statement from "@/sections/Statement";
import Work from "@/sections/Work";
import Plates from "@/sections/Plates";
import Craft from "@/sections/Craft";
import AiWork from "@/sections/AiWork";
import Direction from "@/sections/Direction";
import Voices from "@/sections/Voices";
import Contact from "@/sections/Contact";
import Nav from "@/components/Nav";

/**
 * The page reads as one continuous argument:
 *   who I am → how I got here → what I've shipped →
 *   how I think → who vouches for me → how to reach me.
 *
 * Deliberately removed: TapeSection (buzzword marquee, ×3),
 * Grid/BentoGrid (recognisable template), Approach (Aceternity
 * canvas cards), ProjectsSection (superseded by Work).
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Story />
        <Work />
        <Plates />
        <Craft />
        <AiWork />
        <Direction />
        <Voices />
        <Contact />
      </main>
    </>
  );
}