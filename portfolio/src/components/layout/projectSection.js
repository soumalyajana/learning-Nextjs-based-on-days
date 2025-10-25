"use client";

import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Restaurant Management System",
    subtitle: "Full-stack JS application for restaurant operations",
    tech: ["JavaScript", "Node.js", "Express", "MySQL"],
    description:
      "A complete restaurant management platform built with Node.js, Express, and MySQL, supporting inventory, orders, reservations, and user management.",
    youtube: "#",
    link: "#",
  },
  {
    title: "NLP Topology Creator",
    subtitle: "Regex-based network topology generator",
    tech: ["JavaScript", "Regex", "NLP"],
    description:
      "An NLP-based JS tool that interprets user input sentences to create network topologies with ease.",
    youtube: "#",
    link: "#",
  },
  {
    title: "E-commerce Website",
    subtitle: "Next.js and Firebase online store",
    tech: ["Next.js", "React", "Firebase", "TailwindCSS"],
    description:
      "A fully responsive e-commerce website with authentication, product management, shopping cart, and payment integration using Firebase.",
    youtube: "#",
    link: "#",
  },
  {
    title: "Real-time Chat App",
    subtitle: "WebSocket-based messaging platform",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    description:
      "A real-time chat application that allows users to send messages instantly, create rooms, and see online presence using Socket.io and MongoDB.",
    youtube: "#",
    link: "#",
  }
];

export default function Projects() {
  return (
    <div className="bg-[rgb(247,247,247)] flex flex-col gap-6 p-4 sm:p-6 md:p-10 mx-2 sm:mx-6 lg:mx-24">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 mb-12 text-center sm:text-left"
      >
        Personal Projects
      </motion.h2>

      {/* Projects Cards */}
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg relative min-h-[300px]"
        >
          {/* Icons */}
          <div className="absolute top-4 right-4 flex gap-2 text-gray-600 dark:text-gray-300">
            {project.youtube && (
              <a href={project.youtube} target="_blank" rel="noreferrer">
                <FaYoutube className="w-5 h-5" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                <FaExternalLinkAlt className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {project.title}
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-1">
            {project.subtitle}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-sm hover:bg-amber-400 hover:text-white transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base md:text-base text-gray-700 dark:text-gray-300">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}
