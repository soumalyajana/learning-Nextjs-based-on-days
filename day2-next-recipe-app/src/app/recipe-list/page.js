import RecipeListComponent from "@/components/recipe-list";

async function fetchRecipes() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/recipes");
    const data = await apiResponse.json();
    return data?.recipes || [];
  } catch (e) {
    console.error("Error fetching recipes:", e);
    return [];
  }
}

export default async function RecipeListPage() {
  const recipes = await fetchRecipes();

  return <RecipeListComponent recipesList={recipes} />;
}