"use client";

import { useState } from "react";
import { addAuthor } from "../api";
import { useRouter } from "next/navigation";

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Author name cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await addAuthor(name);
      if (!result) throw new Error("Failed to add author");
      router.push("/authors");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Author</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
