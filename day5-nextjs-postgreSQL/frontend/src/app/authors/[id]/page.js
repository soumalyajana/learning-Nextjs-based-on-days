"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAuthorById } from "../../api";

export default function AuthorDetails() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuthor = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAuthorById(id);
        if (!data) throw new Error("Failed to fetch author");
        setAuthor(data);
      } catch (err) {
        console.error(err);
        setError("Could not load author. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAuthor();
  }, [id]);

  if (loading) return <p>Loading author details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!author) return <p>No author found</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{author.name}</h2>
      <h3 className="text-xl mb-2">Books:</h3>
      <ul>
        {author.books && author.books.length > 0 ? (
          author.books.map((book) => <li key={book.id}>{book.title}</li>)
        ) : (
          <li>No books found</li>
        )}
      </ul>
    </div>
  );
}
