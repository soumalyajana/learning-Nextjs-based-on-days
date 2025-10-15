"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function RecipeListComponent({ recipesList = [] }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 via-white to-orange-100 text-gray-800 font-sans p-8">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-orange-700 mb-6 text-center drop-shadow-sm">
        Discover Delicious Recipes 🍽️
      </h1>

      {/* Back Button */}
      <Link href="/" className="self-start mb-6 mx-28">
        <button className="px-6 py-2 bg-orange-200 hover:bg-orange-300 text-orange-900 font-medium rounded-full shadow-md transition-all duration-300">
          ← Back to Home
        </button>
      </Link>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {recipesList.length > 0 ? (
          recipesList.map((recipe, idx) => (
            <Link
              key={recipe.id ?? `recipe-${idx}`}
              href={`/recipe-list/${recipe.id}`}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Card className="overflow-hidden h-full rounded-2xl shadow-lg hover:shadow-2xl border-none bg-white/80 backdrop-blur-sm flex flex-col">
                {/* Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={recipe.image || "/placeholder.jpg"}
                    alt={recipe.name || "Recipe Image"}
                    fill
                    className="object-cover"
                    priority={idx < 3}
                  />
                </div>

                {/* Content */}
                <CardHeader className="pb-1">
                  <CardTitle className="text-xl font-semibold text-orange-800">
                    {recipe.name || "Unnamed Recipe"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 italic">
                    {recipe.cuisine || "Unknown Cuisine"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="text-sm text-gray-700 list-disc list-inside mb-3">
                    {recipe.ingredients?.length > 0 ? (
                      recipe.ingredients.slice(0, 4).map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))
                    ) : (
                      <li>No ingredients listed</li>
                    )}
                  </ul>
                  <p className="text-sm text-gray-600">
                    ⏱ Prep: {recipe.prepTime ?? "N/A"} mins | 🍳 Cook:{" "}
                    {recipe.cookTime ?? "N/A"} mins
                  </p>
                </CardContent>

                <CardFooter className="pt-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                  >
                    View Full Recipe →
                  </button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No recipes available. Try again later.
          </p>
        )}
      </div>
    </div>
  );
}
