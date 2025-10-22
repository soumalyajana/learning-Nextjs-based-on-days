"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (!token) {
      // No token → redirect to signup automatically
      router.push("/auth/signup");
      setLoading(false);
      return;
    }

    try {
      const data = await getCurrentUser(); // GET /auth/me
      if (!data) {
        localStorage.removeItem("token");
        router.push("/auth/signup"); // Invalid token → signup
        setUser(null);
      } else {
        setUser(data);
      }
    } catch (err) {
      console.error("Auth fetch user error:", err);
      localStorage.removeItem("token");
      router.push("/auth/signup"); // If request fails, redirect
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
