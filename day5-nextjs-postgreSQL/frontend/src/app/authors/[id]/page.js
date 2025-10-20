"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchAuthorById, addBook, deleteBook } from "../../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

export default function AuthorBooks() {
  const { id } = useParams(); // Author ID
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Book management states
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState("");
  const [publishedDate, setPublishDate] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  // Fetch author with books
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

  useEffect(() => {
    loadAuthor();
  }, [id]);

  // Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!newBook.trim() || !publishedDate) {
      setAddError("Book title and publish date are required.");
      return;
    }

    setAdding(true);
    setAddError(null);

    try {
      await addBook(newBook, publishedDate, id);

      // Reset form
      setNewBook("");
      setPublishDate("");
      setOpen(false);

      // Refresh author data
      await loadAuthor();
    } catch (err) {
      console.error(err);
      setAddError("Failed to add book. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  // Delete a book
  const handleDelete = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(bookId);
      await loadAuthor();
    } catch (err) {
      console.error(err);
      alert("Failed to delete book. Please try again.");
    }
  };

  // Loading & Error handling
  if (loading) return <p className="text-center mt-20 text-lg text-gray-600">Loading book details...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!author) return <p className="text-center mt-20 text-gray-600">No author found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
          Books by {author.name}
        </h1>

        {/* Add Book Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              + Add New Book
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/70 border border-indigo-100 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-indigo-700 font-semibold">
                Add New Book
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Enter the book title and publish date below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddBook} className="flex flex-col gap-4 mt-4">
              {addError && <p className="text-red-500 text-sm">{addError}</p>}

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

              <div className="flex justify-end gap-2 mt-2">
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

      {/* Books List Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {author.books?.length > 0 ? (
          author.books.map((book) => (
            <Card
              key={book.id}
              className="shadow-xl hover:shadow-2xl border border-indigo-100 rounded-2xl bg-white/80 transition-all duration-500 ease-out transform hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-indigo-700">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  Published: {new Date(book.publishedDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm italic">
                  Author: {author.name}
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
            No books found for this author.
          </p>
        )}
      </div>
    </div>
  );
}
