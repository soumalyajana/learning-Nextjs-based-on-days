"use client";

import { useState, useEffect } from "react";
import { fetchAuthors, addBook } from "../api";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await fetchAuthors();
        setAuthors(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load authors. Try again later.");
      }
    };
    loadAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !publishedDate || !authorId) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addBook(title, publishedDate, authorId);
      router.push("/books");
    } catch (err) {
      console.error(err);
      setError("Failed to add book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
