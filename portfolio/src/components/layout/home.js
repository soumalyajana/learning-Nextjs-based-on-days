"use client";

import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b border-4 rounded-4xl from-zinc-900 via-black to-zinc-950 font-sans text-white overflow-hidden">
      {/* Background animation */}
      <BackgroundRippleEffect />

      {/* Main content container */}
      <div className="relative w-380 z-40 flex flex-col-reverse md:flex-row items-center 
                      justify-center md:justify-between px-6 sm:px-10 lg:px-24 pt-24 sm:pt-32 md:pt-48 pb-20 gap-12 min-h-[70vh]">
        {/* Left Section - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-400">
            Hi, I'm
          </h2>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-2 text-orange-400 
                         drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
            Soumalya Jana 👋
          </h1>

          <p className="mt-10 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl mx-auto md:mx-0">
            I am a{" "}
            <span className="font-semibold text-amber-400">Computer Science Engineering Student</span>
            , specializing in{" "}
            <span className="font-semibold text-amber-300">C++, JavaScript, React, and Node.js.</span>{" "}
            Experienced in building full-stack applications and real-time systems through
            academic projects and self-learning. Passionate about solving problems with
            technology and continuously improving my technical expertise.
          </p>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="relative group mr-24">
            {/* Soft glow behind image */}
            <div className="absolute -inset-3 rounded-full blur-3xl bg-amber-500/20 opacity-60 
                            group-hover:opacity-80 transition-opacity duration-500"></div>

            <div className="relative rounded-full overflow-hidden 
                            shadow-[0_0_50px_-10px_rgba(251,191,36,0.5)] border border-amber-400/20">
              <Image
                src="/onepiece.jpg"
                alt="Soumalya Jana"
                width={320}
                height={320}
                className="object-cover h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
