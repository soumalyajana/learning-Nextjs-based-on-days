import React, { useState } from "react";

export const PredictCrop = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(""); // Reset previous prediction
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("Please upload an image!");

    // Placeholder: call your API here
    console.log("Submitting image for prediction:", selectedImage);

    // Fake API response for demo
    setTimeout(() => {
      setPrediction("Predicted Disease: Leaf Blight");
    }, 1500);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Crop Disease Prediction
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image Preview */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto w-48 h-48 object-cover rounded-lg shadow-md mb-4"
            />
          )}

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded-lg p-2 cursor-pointer"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Predict Disease
          </button>
        </form>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {prediction}
          </div>
        )}
      </div>
    </section>
  );
};
