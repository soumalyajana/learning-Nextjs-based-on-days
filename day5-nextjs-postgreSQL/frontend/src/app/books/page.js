"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchBooks,
  deleteBook,
  updateBook,
  addBook,
} from "../api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchAuthors, addAuthor } from "../api"; // make sure you have these


export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [showNewAuthorForm, setShowNewAuthorForm] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");


  // Dialog & Form state
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState("");
  const [publishedDate, setPublishDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  // Load books initially
  useEffect(() => {
    loadBooks();
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
  try {
    const data = await fetchAuthors();
    setAuthors(data || []);
  } catch (err) {
    console.error(err);
  }
};

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks();
      setBooks(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.trim() || !publishedDate || !authorId) {
      setAddError("All fields are required.");
      return;
    }

    setAdding(true);
    setAddError(null);
    try {
      const newAddedBook = await addBook(newBook, publishedDate, authorId);
      setBooks((prev) => [...prev, newAddedBook]);
      setNewBook("");
      setPublishDate("");
      setAuthorId("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      setAddError("Failed to add book. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete book
  const handleDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(bookId);
      await loadBooks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete book. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-8">Loading books...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
          📚 Book List
        </h1>

        {/* Add Book Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              + Add New Book
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/80 border border-indigo-100 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-indigo-700 font-semibold">
                Add New Book
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in the details below to add a book.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddBook} className="flex flex-col gap-4 mt-4">
              {addError && (
                <p className="text-red-500 text-sm">{addError}</p>
              )}

              <input
                type="text"
                placeholder="Book Title"
                value={newBook}
                onChange={(e) => setNewBook(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

                <select
  value={authorId}
  onChange={(e) => setAuthorId(e.target.value)}
  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  required
>
  <option value="">-- Select Author --</option>
  {authors.map((a) => (
    <option key={a.id} value={a.id}>
      {a.name}
    </option>
  ))}
</select>

<Link
  href="/authors"
  className="text-blue-600 text-sm hover:underline mt-1"
>
  + Add new author
</Link>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Book List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Card
              key={book.id}
              className="shadow-xl hover:shadow-2xl border border-indigo-100 rounded-2xl bg-white/80 transition-all duration-500 ease-out transform hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-indigo-700">
                   {book.title}
                </CardTitle>
              </CardHeader>

<CardContent className="space-y-2">
  <p className="text-gray-800">
    <span className="font-semibold">Author Name:</span>{" "}
    <span className="text-indigo-600">{book.author?.name || "Unknown"}</span>
  </p>

  <p className="text-gray-700 text-sm">
    <span className="font-semibold">Published:</span>{" "}
    <span className="text-indigo-600 font-medium">
      {new Date(book.publishedDate).toLocaleDateString()}
    </span>
  </p>
</CardContent>


              <CardFooter className="flex justify-between items-center mt-4">
                <Link href={`/books/${book.id}`}>
                  <Button
                    variant="outline"
                    className="border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    View
                  </Button>
                </Link>

                <Button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white transition-all"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
}
