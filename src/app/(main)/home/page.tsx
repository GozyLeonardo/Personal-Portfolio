import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Empire } from "@/components/sections/Empire";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title:
    "Lawrence Nwuzor — AI Orchestrator & Institution Builder, Lagos Nigeria",
  description:
    "Lawrence Nwuzor builds the front of a long-arc empire from Lagos, Nigeria — AI systems, production-grade infrastructure, and tools that hold communities together. Built and shipped from Africa.",
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
