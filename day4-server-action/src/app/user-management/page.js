import { fetchUserActions } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";

async function UserManagement() {
  const getListOfUsers = await fetchUserActions();
  console.log(getListOfUsers);

  return (
    <div className="p-20 max-w-6xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <AddNewUser />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getListOfUsers?.data?.length > 0 ? (
          getListOfUsers.data.map((userItem, index) => (
            <SingleUserCard key={userItem.id || index} userItem={userItem} />
          ))
        ) : (
          <h3>No user found, create one</h3>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
