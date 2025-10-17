// ✅ ServerActionsExample.jsx (Server Component)
// import { fetchListOfProducts } from "@/actions";

export default async function ServerActionsExample() {
  const products = await fetchListOfProducts();

  return (
    <div>
      <h1>Server Actions Example - Server Components</h1>
      <ul>
        {products && products.length > 0 ? (
          products.map((item) => (
            <li key={item.id}>{item.title}</li> // ✅ Added key for each item
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </ul>
    </div>
  );
}
