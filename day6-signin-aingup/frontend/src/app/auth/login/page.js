"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await loginUser(form);

      // If email not registered, redirect directly to signup
      if (res.message && res.message.toLowerCase().includes("not registered")) {
        router.push("/auth/signup");
        return;
      }

      // Save token
      if (res.accessToken) localStorage.setItem("token", res.accessToken);

      // Role-based redirect
      if (res.user?.role === "admin") {
        setSuccess("Welcome Admin ✅ Redirecting...");
        setTimeout(() => router.push("/admin/dashboard"), 1000);
      } else if (res.user?.role === "user") {
        setSuccess("Welcome User ✅ Redirecting...");
        setTimeout(() => router.push("/user/dashboard"), 1000);
      } else {
        setError("Unknown role ❌");
        localStorage.removeItem("token");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials ❌";

      // If user not found, redirect to signup
      if (msg.toLowerCase().includes("not found")) {
        router.push("/auth/signup");
      } else {
        setError(msg);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to log in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
