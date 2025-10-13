import Link from "next/link";

export default function Products() {
  const products = [
    { id: 1, name: "Apple", price: 500 },
    { id: 2, name: "Samsung", price: 400 },
    { id: 3, name: "Nokia", price: 600 },
    { id: 4, name: "Micromax", price: 900 },
    { id: 5, name: "PUBG", price: 1000 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>${product.price}</p>
            <Link
              href={`/products/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
