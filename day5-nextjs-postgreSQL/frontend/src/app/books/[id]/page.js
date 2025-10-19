"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBookById } from "../../api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookById(id);
        if (!data) throw new Error("Book not found");
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load book. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p className="mb-1">Author: {book.author?.name || "Unknown Author"}</p>
      <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
    </div>
  );
}
