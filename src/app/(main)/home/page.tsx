import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Empire } from "@/components/sections/Empire";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Lawrence Nwuzor — Builder, Lagos Nigeria",
  description:
    "I am building what shouldn't work, from where it shouldn't. Ten live builds, shipped from Lagos — most African tech is cosplay, this is the real thing.",
  alternates: { canonical: "/home" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Empire />
      <Contact />
    </>
  );
}
