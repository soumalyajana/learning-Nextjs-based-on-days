"use client";

import { useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "../api";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks();
      setBooks(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete book. Please try again.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <a href="/books/addBook" className="text-blue-500 mb-4 inline-block">
        + Add Book
      </a>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="flex justify-between mb-2">
              <span>
                {book.title} by {book.author?.name || "Unknown Author"}
              </span>
              <div>
                <a href={`/books/${book.id}`} className="text-green-500 mr-2">
                  View
                </a>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No books found</li>
        )}
      </ul>
    </div>
  );
}
