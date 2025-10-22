"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
  if (!loading && !user) {
    router.push("/auth/login"); // ✅ correct path
  }
}, [loading, user, router]);


  const handleLogout = () => {
  localStorage.removeItem("token"); // Remove JWT token
  router.push("/auth/login"); // ✅ correct path
};


  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      {user && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {user.username}!
          </h1>
          <p className="mb-6 text-gray-700">
            You are logged in as <strong>{user.role}</strong>.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
