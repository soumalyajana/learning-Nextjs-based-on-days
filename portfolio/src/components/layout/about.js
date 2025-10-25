"use client";
import React from "react";

export default function About() {
  return (
    <div className="w-[100vw] h-[80vh] pt-8 bg-[rgb(247,247,247)] flex flex-col md:flex-row justify-around p-5">
      <div className="md:text-[3vh] text-center text-[20px] text-[#31111d] md:p-[16%] pt-0 font-semibold font-mono">
        <p>
          I am a Computer Science Engineering student. Passionate and curious about new creative ways of problem-solving and challenges.
        </p>
        <span>
          With many previous works in different fields of sciences, I possess a vivid background that helps me factor in different aspects for the{" "}
        </span>
        <span className="text-[5vh] font-bold">Bigger Picture</span>
        <span> in decision-making.</span>
      </div>
    </div>
  );
}
