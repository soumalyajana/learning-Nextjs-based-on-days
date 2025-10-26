import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white min-h-screen mt-11 flex items-center">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Smart Crop Prediction <br /> for Better Farming
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            CropPredict helps farmers maximize yield with accurate AI-powered
            crop predictions based on soil, weather, and historical data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/predict"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Predict Your Crop
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="https://via.placeholder.com/400x300.png?text=Crop+Prediction+Illustration"
            alt="Crop Prediction"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
