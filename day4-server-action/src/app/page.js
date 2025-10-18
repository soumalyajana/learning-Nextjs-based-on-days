import Image from "next/image";

export default function Home() {
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold text-blue-600">Server Actions Demo</h1>
      <p className="text-gray-600 text-center max-w-md">
        This page demonstrates how to add new users using Next.js Server Actions and MongoDB.
      </p>
    </div>
  );
}
