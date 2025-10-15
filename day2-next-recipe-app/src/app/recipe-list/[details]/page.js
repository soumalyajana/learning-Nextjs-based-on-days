import RecipeDetailsPage from "@/components/recipe-details";

async function fetchRecipeDetails(currentRecipeId) {
  try {
    const apiResponse = await fetch(
      `https://dummyjson.com/recipes/${currentRecipeId}`
    );
    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}

export default async function RecipeDetails({ params }) {
  const { details } = await params; // ✅ await params first
  const recipeData = await fetchRecipeDetails(details);

  if (!recipeData) {
    return <p className="text-center mt-20 text-red-500">Recipe not found!</p>;
  }

  return <RecipeDetailsPage recipe={recipeData} />;
}
