"use client";

import { useState } from "react";
import { loginUser } from "../../../lib/api/auth";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const res = await loginUser(form);
    setSuccess("Login successful ✅");
    console.log("Logged in user:", res);

    // Save JWT token
    if (res.accessToken) localStorage.setItem("token", res.accessToken);

    // Redirect to dashboard/home page
    window.location.href = "/home";
  } catch (err) {
    setError(err.response?.data?.message || "Login failed ❌");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded-md p-2"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded-md p-2"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
