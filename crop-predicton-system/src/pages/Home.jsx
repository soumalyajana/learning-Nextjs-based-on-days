import React from "react";
import { Hero } from "../components/home/hero";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features / CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Why Choose CropPredict?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Accurate Predictions</h3>
            <p className="text-gray-600">
              Get reliable crop predictions based on soil, weather, and historical data.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Smart Dashboard</h3>
            <p className="text-gray-600">
              Track your fields, crop plans, and yield all in one place.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              Easy to use platform for farmers of all sizes with a clean interface.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            to="/predict"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Predict Your Crop Now
          </Link>
        </div>
      </section>
    </div>
  );
};
