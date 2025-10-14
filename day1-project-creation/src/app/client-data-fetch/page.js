'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientSideDataFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDataFromApi() {
    try {
      const res = await fetch('https://dummyjson.com/users');
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (loading) {
    return <h1 className="text-2xl text-blue-500">Loading... Please wait</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Client-side Data Fetching</h1>
      <ul>
        {users.map((user) => (
          <li className="text-xl text-green-400" key={user.id}>
            {user.firstName} {user.lastName} — {user.email}  
            {/* ✅ Correct Link */}
            <Link 
              className="text-blue-400 underline ml-2"
              href={`/client-data-fetch/${user.id}`}
            >
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
