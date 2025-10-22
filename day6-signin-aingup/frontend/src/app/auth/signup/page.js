"use client";

import { useState } from "react";
import { registerUser } from "../../../lib/api/auth";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
      const res = await registerUser(form);
      setSuccess("Signup successful ✅");
      console.log("New user:", res);

      // Redirect to login after signup
      setTimeout(() => window.location.href = "/auth/login", 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          type="text"
          name="username"   // <-- updated here
          placeholder="Full Name"
          className="w-full border rounded-md p-2"
          value={form.username}
          onChange={handleChange}
          required
        />

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
        <select
  name="role"
  value={form.role}
  onChange={(e) => setForm({ ...form, role: e.target.value })}
  className="w-full border rounded-md p-2"
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>


        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
