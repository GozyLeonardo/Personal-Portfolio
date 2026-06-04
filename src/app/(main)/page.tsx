import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Empire } from "@/components/sections/Empire";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title:
    "Lawrence Nwuzor — Web Developer & AI Automation Engineer, Lagos Nigeria",
  description:
    "Lawrence Nwuzor builds production-grade websites, AI automations, and digital infrastructure from Lagos, Nigeria. Next.js, Supabase, and full-stack systems for businesses across Africa and beyond.",
  alternates: { canonical: "/" },
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
