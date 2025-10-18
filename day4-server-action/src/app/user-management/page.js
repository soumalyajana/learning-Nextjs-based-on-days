'use client';

import { useEffect, useState } from "react";
import { fetchUserActions } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUserActions();
      if (res.success) setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        {/* Pass refresh function to modal */}
        <AddNewUser refreshUsers={getUsers} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((userItem, index) => (
            <SingleUserCard
              key={userItem._id || index}
              userItem={userItem}
              refreshUsers={getUsers} // pass refresh to each card
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No users found. Create one using the button above.</p>
      )}
    </div>
  );
}
