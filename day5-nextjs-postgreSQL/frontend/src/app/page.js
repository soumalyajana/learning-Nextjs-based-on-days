"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 gap-8">
      <h1 className="text-4xl font-bold text-blue-600">Library App</h1>
      <p className="text-gray-700 text-lg">
        Manage Authors and Books easily
      </p>

      <div className="flex gap-4 flex-col sm:flex-row">
        <Link
          href="/authors"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          View Authors
        </Link>
        <Link
          href="/books"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
        >
          View Books
        </Link>
      </div>
    </div>
  );
}
