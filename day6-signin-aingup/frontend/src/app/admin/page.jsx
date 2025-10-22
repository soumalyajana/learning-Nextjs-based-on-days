"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // redirect to login
      } else if (user.role !== "admin") {
        router.push("/"); // redirect non-admins to home
      }
    }
  }, [loading, user, router]);

  // Fetch admin welcome message
  useEffect(() => {
    const fetchAdminMessage = async () => {
      try {
        const res = await axiosInstance.get("/admin/welcome");
        setMessage(res.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch admin data");
      }
    };

    if (user && user.role === "admin") {
      fetchAdminMessage();
    }
  }, [user]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      {user && user.role === "admin" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          {message && <p className="text-gray-700 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
