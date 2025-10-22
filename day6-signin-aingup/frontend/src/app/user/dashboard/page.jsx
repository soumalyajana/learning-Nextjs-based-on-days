"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAllImages } from "@/lib/api/iamge";

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  // Redirect if not a user
  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (user.role !== "user") router.push("/admin/dashboard");
      else fetchImages();
    }
  }, [user, loading]);

  // Fetch all images
  const fetchImages = async () => {
    try {
      const res = await getAllImages();
      setImages(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch images");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img._id} className="border p-2 rounded shadow">
              <img
                src={img.url}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded"
              />
              <p className="text-sm mt-1">
                Uploaded by: {img.uploadedBy?.username || "Unknown"}
              </p>
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}
