"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and TailwindCSS, showcasing projects, skills, and contact info.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/yourusername/portfolio",
    demo: "#",
    image: "/portfolio-demo.png",
  },
  {
    title: "Real-time Chat App",
    description:
      "A real-time chat application with user authentication and live messaging using Socket.io and Node.js.",
    techStack: ["Node.js", "Socket.io", "React", "Express"],
    github: "https://github.com/yourusername/chat-app",
    demo: "#",
    image: "/chat-demo.png",
  },
  // Add more projects as needed
];

export default function ProjectsSection() {
  return (
    <section className="w-full py-20 px-6 sm:px-10 lg:px-24">
      <h2 className="text-4xl sm:text-5xl font-bold text-amber-400 text-center mb-12">
        My Projects
      </h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white/5 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-2xl font-semibold text-amber-400 mb-2">
              {project.title}
            </h3>
            <p className="text-neutral-300 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
