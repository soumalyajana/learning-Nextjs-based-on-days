"use client";

import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";

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
  },
  {
    title: "Expense Tracker",
    subtitle: "Personal finance management app",
    tech: ["React", "TypeScript", "Vite", "LocalStorage"],
    description:
      "A lightweight web application to track personal expenses, categorize spending, and visualize financial data with charts.",
    youtube: "#",
    link: "#",
  },
  {
    title: "AI-based Route Planner",
    subtitle: "Smart navigation for emergency vehicles",
    tech: ["Python", "Flask", "OpenStreetMap API", "Machine Learning"],
    description:
      "An AI-powered system to calculate optimal routes for ambulances in real-time using traffic data and predictive analytics.",
    youtube: "#",
    link: "#",
  },
];


export default function Projects() {
  return (
    <div className="bg-[rgb(247,247,247)] flex  flex-col ml-30 mr-30 gap-6 p-6">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-white h-90 dark:bg-gray-900 rounded-xl p-10 shadow-lg relative"
        >
          <div className="absolute top-4 right-4 flex gap-2 text-gray-600 dark:text-gray-300">
            {project.youtube && (
              <a href={project.youtube} target="_blank">
                <FaYoutube className="w-5 h-5" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank">
                <FaExternalLinkAlt className="w-5 h-5" />
              </a>
            )}
          </div>
          <h2 className="text-7xl font-bold">{project.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
