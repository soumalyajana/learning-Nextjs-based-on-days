'use client';

import { useContext, useState } from "react";
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
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UserContext } from "@/context";

function SingleUserCard({ userItem, refreshUsers }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentEditedId, setOpenPopup, setAddNewUserFormData } = useContext(UserContext);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteUserAction(userItem._id, "/user-management");
      alert(res.message);
      refreshUsers(); // ✅ refresh after delete
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setCurrentEditedId(userItem._id);
    setAddNewUserFormData({
      firstName: userItem.firstName,
      lastName: userItem.lastName,
      email: userItem.email,
      address: userItem.address,
    });
    setOpenPopup(true);
  };

  return (
    <Card className="p-4 shadow-sm hover:shadow-md transition-all rounded-lg">
      <CardHeader>
        <CardTitle>{userItem.firstName} {userItem.lastName}</CardTitle>
        <CardDescription>{userItem.email}</CardDescription>
      </CardHeader>
      <CardContent><p className="text-gray-600">{userItem.address}</p></CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="text-blue-600" onClick={handleEdit}>Edit</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="destructive">Delete</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}


export default SingleUserCard;
