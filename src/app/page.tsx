import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Skills       from "@/components/sections/Skills";
import Projects     from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Education    from "@/components/sections/Education";
import Contact      from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}