
import Approach from "@/sections/Approach";
import Foter from "@/sections/Foter";
import Grid from "@/sections/Grid";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { LivesProject } from "@/sections/LivesProject";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <ProjectsSection/>
      <TapeSection/>
      <LivesProject/>
      <Grid/>
      <TapeSection/>
      <Approach/>
      <TapeSection/>
      <TestimonialsSection/>
      <Foter/>
      
    </div>
  );
}
