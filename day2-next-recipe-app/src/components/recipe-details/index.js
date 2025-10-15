import Image from "next/image";
import Link from "next/link";

export default function RecipeDetailsPage({ recipe }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-white to-orange-100 text-gray-800 font-sans py-12 px-4 sm:px-8">
      

      {/* Recipe Title */}
      <h1 className="text-5xl font-extrabold text-orange-700 text-center drop-shadow-sm mb-2">
        {recipe.name || "Recipe Details"}
      </h1>
      <p className="text-lg text-gray-700 mb-8 italic">
        Cuisine:{" "}
        <span className="font-semibold text-orange-600">
          {recipe.cuisine || "Unknown"}
        </span>
      </p>

      {/* Back Button */}
      <Link href="/recipe-list" className="self-start mb-6 mx-80">
        <button className="px-6 py-2 bg-orange-200 hover:bg-orange-300 text-orange-900 font-medium rounded-full shadow-md transition-all duration-300">
          ← Back to Recipes
        </button>
      </Link>

      {/* Image */}
      <div className="relative w-full max-w-3xl h-72 rounded-2xl overflow-hidden shadow-lg mb-10">
        <Image
          src={recipe.image || "/placeholder.jpg"}
          alt={recipe.name || "Recipe Image"}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Details Card */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl space-y-8">
        {/* Ingredients Section */}
        <div>
          <h2 className="text-3xl font-semibold text-orange-700 mb-4">
            🥕 Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-800 leading-relaxed">
            {recipe.ingredients?.length > 0 ? (
              recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))
            ) : (
              <li>No ingredients listed</li>
            )}
          </ul>
        </div>

        {/* Time Info */}
        <div className="flex flex-wrap gap-6 text-lg text-gray-700">
          <p>
            ⏱ Prep Time:{" "}
            <span className="font-semibold text-orange-600">
              {recipe.prepTime ?? "N/A"} mins
            </span>
          </p>
          <p>
            🍳 Cook Time:{" "}
            <span className="font-semibold text-orange-600">
              {recipe.cookTime ?? "N/A"} mins
            </span>
          </p>
        </div>

        {/* Optional Source Link */}
        {recipe.sourceUrl && (
          <div className="text-center pt-4">
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition-all duration-300"
            >
              View Full Recipe →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
