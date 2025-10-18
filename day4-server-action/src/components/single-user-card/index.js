'use client';

import { deleteUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



function SingleUserCard({ userItem }) {
  const handleDelete = async (userId) => {
    if (!confirm(<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>)) return;

    try {
      const result = await deleteUserAction(userId, "/user-management");
      if (result.success) {
        alert(result.message);
        // Optionally, refresh the page or re-fetch data
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <Card className="p-4 shadow-sm hover:shadow-md transition-all rounded-lg">
      <CardHeader>
        <CardTitle>
          {userItem?.firstName} {userItem?.lastName}
        </CardTitle>
        <CardDescription>{userItem?.email}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600">{userItem?.address}</p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="text-blue-600">
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDelete(userItem._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SingleUserCard;
