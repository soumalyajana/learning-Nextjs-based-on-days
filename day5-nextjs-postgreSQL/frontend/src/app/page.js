"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-lg">
          Welcome to Library App
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          Easily manage your authors and books in one place.
        </p>

        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/authors"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:-translate-y-1"
          >
            View Authors
          </Link>
          <Link
            href="/books"
            className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 transition transform hover:-translate-y-1"
          >
            View Books
          </Link>
        </div>
      </div>

    </div>
  );
}
