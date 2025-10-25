"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { GiBearFace } from "react-icons/gi";
import {
  SiJavascript,
  SiTailwindcss,
  SiChakraui,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiMongodb,
  SiExpress,
  SiGit,
  SiPostman,
} from "react-icons/si";
import { ShineBorder } from "../ui/shine-border";


const skillTabs = [
  "Frontend",
  "Backend",
  "Database",
  "Version Control",
  "Tools",
];

const skillsData = {
  Frontend: [
    { name: "HTML", icon: SiHtml5, color: "#E44D26" },
    { name: "CSS", icon: SiCss3, color: "#264DE4" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "ChakraUI", icon: SiChakraui, color: "#319795" },
    { name: "React.js", icon: FaReact, color: "#61DBFB" },
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "Zustand", icon: GiBearFace, color: "#FBBF24" },
  ],
  Backend: [
    { name: "Node.js", icon: FaNodeJs, color: "#3C873A" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
  ],
  Database: [
    { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
    { name: "SQL", icon: FaDatabase, color: "#F97316" },
  ],
  "Version Control": [
    { name: "Git", icon: SiGit, color: "#F1502F" },
    { name: "GitHub", icon: SiGit, color: "#000000" },
  ],
  Tools: [{ name: "Postman", icon: SiPostman, color: "#FF6C37" }],
};

function SkillCard({ skill, index }) {
  const Icon = skill.icon;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
    
      <Tilt scale={1.05} glareEnable glareMaxOpacity={0.1}>
        <ShineBorder/>
        <div className="bg-white dark:bg-neutral-800 rounded border border-gray-300/50 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 p-6 flex flex-col items-center justify-between h-full">
          <div
            className="text-5xl mb-4 transition-transform duration-300 hover:scale-110"
            style={{ color: skill.color }}
          >
            <Icon />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3 dark:text-gray-100">
            {skill.name}
          </h3>
          <button className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-amber-400 hover:text-white transition-colors duration-300 dark:bg-neutral-700 dark:text-gray-100">
            Explore
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <div className="w-full py-20 px-6 sm:px-10 lg:px-24 bg-[rgb(247,247,247)] dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <ShineBorder />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12 text-center sm:text-left"
      >
        My Skills
      </motion.h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-12">
        {skillTabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded text-lg font-semibold transition-all duration-300 shadow-md ${
              activeTab === tab
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-amber-300 dark:bg-neutral-700 dark:text-gray-100 dark:hover:bg-amber-400"
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8"
      >
        
        {skillsData[activeTab].map((skill, index) => (
          
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
