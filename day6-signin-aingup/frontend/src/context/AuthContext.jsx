"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  const fetchUser = async () => {
    // Only check localStorage in browser
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getCurrentUser(); // GET /auth/me
      setUser(data); // data is user object
    } catch (err) {
      console.error("Auth fetch user error:", err);
      setUser(null);
      localStorage.removeItem("token"); // remove invalid token
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

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
