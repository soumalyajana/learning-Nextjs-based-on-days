"use client";

import { useEffect, useState } from "react";
import { fetchAuthors, deleteAuthor } from "../api";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuthors();
      setAuthors(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load authors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this author?")) return;
    try {
      await deleteAuthor(id);
      loadAuthors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete author. Please try again.");
    }
  };

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Authors</h2>
      <a href="/authors/addAuthor" className="text-blue-500 mb-4 inline-block">
        + Add Author
      </a>
      <ul>
        {authors.length > 0 ? (
          authors.map((author) => (
            <li key={author.id} className="flex justify-between mb-2">
              <span>{author.name}</span>
              <div>
                <a
                  href={`/authors/${author.id}`}
                  className="text-green-500 mr-2"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(author.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No authors found</li>
        )}
      </ul>
    </div>
  );
}
