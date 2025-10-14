'use client';

import { useEffect, useState, use } from "react";

export default function DetailsPage({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params using React.use()
  const { id } = use(params);

  async function fetchUser() {
    try {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const result = await res.json();
      setUser(result);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]); // include id as dependency

  if (loading) {
    return <h1 className="text-2xl text-blue-500">Please wait, loading ho raha hai bro 😎</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        User Details for {user.firstName} {user.lastName}
      </h1>
      <p>Age: {user.age}</p>
      <p>Phone: {user.phone}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
