"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <div className="relative min-h-screen bg-black font-sans text-white overflow-hidden">
      {/* ✅ Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/soum.avif"
          alt="Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 lg:px-20 pt-24 sm:pt-32 md:pt-40 pb-20 gap-10 md:gap-20 min-h-[80vh]">
        {/* ✅ Left Section - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="
            w-full md:w-1/2 flex flex-col justify-center 
            text-center md:text-left space-y-6
            md:pl-10 lg:pl-10  /* 👈 pushes it slightly right */
          "
        >
          {/* ✅ Name Section */}
          <h1 className="text-[12vw] sm:text-[8vw] md:text-[5vw] font-extrabold leading-tight">
            <span className="text-yellow-400 text-lg sm:text-2xl bg-transparent rounded-3xl px-4 py-2 inline-block">
              Hi, I'm
            </span>
            <br />
            <span className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              Soumalya&nbsp;Jana&nbsp;👋
            </span>
          </h1>

          {/* ✅ Description Section */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto md:mx-0 px-2 sm:px-0">
            I am a{" "}
            <span className="font-semibold text-amber-400">
              Computer Science Engineering Student
            </span>
            , specializing in{" "}
            <span className="font-semibold text-amber-300">
              C++, JavaScript, React, and Node.js
            </span>
            . Experienced in building full-stack applications and real-time
            systems through academic projects and self-learning. Passionate
            about solving problems with technology and continuously improving
            my technical expertise.
          </p>
        </motion.div>

        {/* ✅ Right Section - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="relative group">
            {/* Soft Glow Behind Image */}
            <div className="absolute -inset-4 rounded-full blur-3xl bg-amber-500/20 opacity-70 group-hover:opacity-90 transition-all duration-500" />

            {/* Rounded Profile Image */}
            <div className="relative rounded-full overflow-hidden shadow-[0_0_50px_-10px_rgba(251,191,36,0.5)] border border-amber-400/30">
              <Image
                src="/onepiece.jpg"
                alt="Soumalya Jana"
                width={320}
                height={320}
                className="object-cover h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
