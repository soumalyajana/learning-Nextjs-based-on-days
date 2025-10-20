// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   addAuthor,
//   fetchAuthors,
//   fetchAuthorById,
//   deleteAuthor,
// } from "../api";
// import {
//   fetchBooks,
//   fetchBookById,
//   addBook,
//   deleteBook,
//   updateBook,
// } from "../api";

// // 1️⃣ Create the context
// const AppContext = createContext();

// // 2️⃣ Provider component
// export const AppProvider = ({ children }) => {
//   // Authors state
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(true);

//   // Books state (optional: can also store inside authors)
//   const [books, setBooks] = useState([]);
//   const [loadingBooks, setLoadingBooks] = useState(true);

//   // Fetch all authors
//   const loadAuthors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchAuthors();
//       setAuthors(data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load authors. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new author
//   const handleAddAuthor = async (e) => {
//     e.preventDefault();
//     if (!newAuthor.trim()) {
//       setAddError("Author name cannot be empty.");
//       return;
//     }

//     setAdding(true);
//     setAddError(null);
//     try {
//       await addAuthor(newAuthor);
//       setNewAuthor("");
//       setOpen(false);
//       loadAuthors();
//     } catch (err) {
//       console.error(err);
//       setAddError("Failed to add author. Please try again.");
//     } finally {
//       setAdding(false);
//     }
//   };

//   // Delete author
//   const handleDeleteAuthor = async (id) => {
//     if (!confirm("Are you sure you want to delete this author?")) return;
//     try {
//       await deleteAuthor(id);
//       loadAuthors();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete author. Please try again.");
//     }
//   };

//   // Add book to an author
//   const handleAddBook = async (authorId, title, publishedDate) => {
//     const newBook = await addBook(title, publishedDate, authorId);

//     // Update author’s books
//     setAuthors((prev) =>
//       prev.map((a) =>
//         a.id === authorId
//           ? { ...a, books: [...(a.books || []), newBook] }
//           : a
//       )
//     );

//     // Optionally update books array
//     setBooks((prev) => [...prev, newBook]);

//     return newBook;
//   };

//   // Delete book
//   const handleDeleteBook = async (authorId, bookId) => {
//     await deleteBook(bookId);

//     // Remove book from author
//     setAuthors((prev) =>
//       prev.map((a) =>
//         a.id === authorId
//           ? { ...a, books: a.books.filter((b) => b.id !== bookId) }
//           : a
//       )
//     );

//     // Optionally remove from books array
//     setBooks((prev) => prev.filter((b) => b.id !== bookId));
//   };

//   useEffect(() => {
//     loadAuthors();
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         authors,
//         loadingAuthors,
//         books,
//         loadingBooks,
//         loadAuthors,
//         handleAddAuthor,
//         handleDeleteAuthor,
//         handleAddBook,
//         handleDeleteBook,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // 3️⃣ Hook to use context easily
// export const useAppContext = () => useContext(AppContext);




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