import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { NavbarDemo } from "@/components/layout/Navbar";
import HomeSection from "@/components/layout/home";
import  ProjectsSection  from "@/components/layout/projectSection"
import NextLevelSkillsSection from "@/components/layout/skill";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Navbar fixed at top */}
      <NavbarDemo />
      <HomeSection/>
      <NextLevelSkillsSection/>
      <ProjectsSection/>
    </div>
  );
}
