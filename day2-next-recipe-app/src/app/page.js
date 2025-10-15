import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-yellow-100 text-gray-800 overflow-hidden">
      
      {/* Background decorative blur circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-200/50 rounded-full blur-3xl animate-pulse"></div>

      {/* Hero Section */}
      <div className="z-10 text-center px-4 sm:px-8 max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          🍳 Welcome to <span className="text-orange-600">RecipeApp</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          Discover delicious recipes from around the world. 
          Learn, cook, and enjoy — one dish at a time!
        </p>

        <Link
          href="/recipe-list"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          Explore Recipes →
        </Link>
      </div>

      {/* Hero Image */}
      <div className="z-10 mt-12 sm:mt-16 relative w-[320px] h-[220px] sm:w-[480px] sm:h-[320px] rounded-2xl overflow-hidden shadow-xl border border-orange-200">
        <Image
          src="/download.jpeg"
          alt="Delicious food"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Footer */}
      <footer className="z-10 absolute bottom-6 text-sm text-gray-500">
        Made with ❤️ by <span className="font-medium">Soumalya Jana</span>
      </footer>
    </main>
  );
}
