import React from "react";

export const About = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-16">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            About CropPredict
          </h2>
          <p className="text-gray-700 mb-6">
            CropPredict is an AI-powered crop prediction management system
            designed to help farmers make informed decisions. By analyzing
            soil, weather, and historical crop data, we provide accurate
            recommendations to maximize yield and reduce losses.
          </p>
          <p className="text-gray-700">
            Our platform offers a user-friendly dashboard where you can track
            predictions, manage your fields, and plan crop rotations for
            optimal productivity. Whether you are a small-scale farmer or a
            large agricultural business, CropPredict makes smart farming
            easier.
          </p>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="https://via.placeholder.com/400x300.png?text=Crop+Prediction+Illustration"
            alt="Crop Prediction Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
