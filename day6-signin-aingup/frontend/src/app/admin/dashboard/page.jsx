"use client"; // MUST be at the top

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllImages, uploadImage, deleteImage } from "@/lib/api/iamge";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (user.role !== "admin") router.push("/user/dashboard");
      else fetchImages();
    }
  }, [user, loading]);

  const fetchImages = async () => {
    try {
      const res = await getAllImages();
      setImages(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch images");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await uploadImage(formData);
      setMessage("Image uploaded successfully ✅");
      setSelectedFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteImage(id);
      setMessage("Image deleted successfully ✅");
      fetchImages();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Delete failed ❌");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Upload Section */}
      <div className="mb-6">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Images List */}
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
              <Button
                variant="destructive"
                size="sm"
                className="mt-2 w-full"
                onClick={() => handleDelete(img._id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}
