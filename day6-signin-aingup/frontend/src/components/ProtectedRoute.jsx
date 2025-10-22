"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>; // or a spinner

  return user ? children : null;
}
