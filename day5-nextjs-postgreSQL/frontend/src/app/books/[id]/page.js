"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  fetchBookById,
  updateBook,
  deleteBook,
  fetchAuthors,
} from "../../api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit dialog states
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState(""); // string for select
  const [updating, setUpdating] = useState(false);

  // Fetch book + authors
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bookData, authorsData] = await Promise.all([
          fetchBookById(id),
          fetchAuthors(),
        ]);
        setBook(bookData);
        setAuthors(authorsData || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Prefill fields for edit
  const handleEditClick = () => {
    if (!book) return;
    setTitle(book.title);
    setPublishedDate(book.publishedDate.split("T")[0]);
    setAuthorId(book.author ? book.author.id.toString() : "");
    setOpen(true);
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // Send updated data to backend
      await updateBook(id, title, publishedDate, Number(authorId));

      // Update frontend state immediately
      const updatedAuthor = authors.find(a => a.id === Number(authorId));
      setBook({
        ...book,
        title,
        publishedDate,
        authorId: Number(authorId),
        author: updatedAuthor,
      });

      setOpen(false);
      alert("✅ Book updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update book.");
    } finally {
      setUpdating(false);
    }
  };

  // Delete book
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id);
      alert("🗑️ Book deleted successfully!");
      router.push("/books");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete book.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-8">Loading book...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!book)
    return <p className="text-center text-gray-600 mt-8">Book not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{book.title}</h2>
        <p className="text-gray-700 mb-2">
          <b>Author:</b> {book.author?.name || "Unknown"}
        </p>
        <p className="text-gray-700 mb-4">
          <b>Published:</b> {new Date(book.publishedDate).toLocaleDateString()}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleEditClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                ✏️ Edit
              </Button>
            </DialogTrigger>

            {/* Edit Dialog */}
            <DialogContent className="sm:max-w-md bg-white/90 rounded-2xl shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl text-indigo-700 font-semibold">
                  Edit Book
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-3">
                <Input
                  type="text"
                  placeholder="Book Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                />

                <select
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
                  <option value="">-- Select Author --</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id.toString()}>
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
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            🗑️ Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
