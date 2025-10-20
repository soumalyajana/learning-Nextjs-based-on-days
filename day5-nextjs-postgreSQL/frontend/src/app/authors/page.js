"use client";

import { useEffect, useState } from "react";
import { fetchAuthors, deleteAuthor, addAuthor } from "../api";
import Link from "next/link";
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

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add Author Dialog state
  const [open, setOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

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

  const handleAddAuthor = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim()) {
      setAddError("Author name cannot be empty.");
      return;
    }

    setAdding(true);
    setAddError(null);
    try {
      await addAuthor(newAuthor);
      setNewAuthor("");
      setOpen(false);
      loadAuthors();
    } catch (err) {
      console.error(err);
      setAddError("Failed to add author. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading authors...
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-medium">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
            Authors List
          </h1>
        </div>

        {/* Add Author Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              + Add New Author
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/70 border border-indigo-100 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-indigo-700 font-semibold">
                Add New Author
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Enter the author’s name below and click <b>Add</b> to save.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleAddAuthor}
              className="flex flex-col gap-4 mt-4"
            >
              {addError && <p className="text-red-500 text-sm">{addError}</p>}

              <input
                type="text"
                placeholder="Author Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

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

      {/* Author Cards Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {authors.length > 0 ? (
          authors.map((author, index) => (
            <Card
              key={author.id}
              className={`shadow-xl hover:shadow-2xl backdrop-blur-md border border-indigo-100 rounded-2xl bg-white/80 transition-all duration-500 ease-out transform hover:-translate-y-1 ${
                index % 2 === 0 ? "animate-fade-in-up" : "animate-fade-in"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-indigo-700">
                  {author.name}
                </CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  {author.books?.length
                    ? `${author.books.length} Book${
                        author.books.length > 1 ? "s" : ""
                      }`
                    : "No books yet"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-1">
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {author.books?.length ? (
                    author.books.map((book) => (
                      <li key={book.id}>{book.title}</li>
                    ))
                  ) : (
                    <li className="italic text-gray-400">No books found</li>
                  )}
                </ul>
              </CardContent>

              <CardFooter className="flex justify-between items-center mt-4">
                <Link href={`/authors/${author.id}`}>
                  <Button
                    variant="outline"
                    className="border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    View
                  </Button>
                </Link>

                <Button
                  onClick={() => handleDelete(author.id)}
                  className="bg-red-500 hover:bg-red-600 text-white transition-all"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No authors found.
          </p>
        )}
      </div>
    </div>
  );
}
