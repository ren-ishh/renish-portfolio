import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Skills       from "@/components/sections/Skills";
import Projects     from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Education    from "@/components/sections/Education";
import Contact      from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";
import { getGitHubProjects } from "@/lib/github";

export default async function Home() {
  const projects = await getGitHubProjects();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Achievements />
      <Education />
      <Blog/>
      <Contact />
    </>
  );
}