"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleNavigation() {
    router.push("/products"); // navigate programmatically
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">Hello from Next.js</h1>

      {/* Static navigation */}
      <div className="flex flex-col gap-2">
        <Link href="/products" className="text-blue-500 hover:underline">
          Navigate to Products Page
        </Link>

        <Link href="/account" className="text-blue-500 hover:underline">
          Navigate to Account Page
        </Link>
      </div>

      {/* Programmatic navigation */}
      <button
        onClick={handleNavigation}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Go to Products (via router.push)
      </button>
    </div>
  );
}
