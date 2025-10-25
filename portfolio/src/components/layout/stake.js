"use client";
import React from "react";

export default function Stake() {
  return (
    <div className="w-full flex justify-center p-4 sm:p-8 bg-white shadow-lg rounded-xl min-h-[550px]">
      <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-6xl p-5 space-y-8 md:space-y-0">
        
        {/* Column 1 */}
        <div className="text-black flex flex-col items-center md:items-start space-y-3 text-[24px] sm:text-[28px] md:text-[5vh] font-semibold">
          <div>MERN</div>
          <div>Data Analytics</div>
          <div>Machine Learning</div>
        </div>
        
        {/* Separator */}
        <div className="text-[60px] sm:text-[80px] md:text-[100px] animate-spin duration-[3000ms] text-gray-400 my-4 md:my-0">
          ⚙️
        </div>
        
        {/* Column 2 */}
        <div className="text-black flex flex-col items-center md:items-end space-y-3 text-[24px] sm:text-[28px] md:text-[5vh] font-semibold">
          <div>Computer Graphics</div>
          <div>MongoDB</div>
          <div>SQL</div>
        </div>

      </div>
    </div>
  );
}
