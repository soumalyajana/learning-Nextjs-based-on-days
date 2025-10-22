"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
      </div>
    </ProtectedRoute>
  );
}
