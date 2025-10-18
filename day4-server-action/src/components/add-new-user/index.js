'use client';

import { useContext } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewFormControl, addNewUserInitialState } from "../../app/utils";
import { handleAddNewUserAction, editUserAction } from "@/actions";
import { UserContext } from "@/context";

export default function AddNewUser({ refreshUsers }) {
  const {
    currentEditedId,
    setCurrentEditedId,
    openPopup,
    setOpenPopup,
    addNewUserFormData,
    setAddNewUserFormData
  } = useContext(UserContext);

  const handleSaveButtonValid = () =>
    Object.values(addNewUserFormData).every(value => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEditedId) {
        await editUserAction(currentEditedId, addNewUserFormData, "/user-management");
      } else {
        await handleAddNewUserAction(addNewUserFormData);
      }

      // ✅ Refresh parent list
      refreshUsers();

      setOpenPopup(false);
      setAddNewUserFormData(addNewUserInitialState);
      setCurrentEditedId(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add New User</Button>

      <Dialog open={openPopup} onOpenChange={setOpenPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentEditedId ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              Enter user details below and click save when done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-2">
            {addNewFormControl.map((controlItem) => (
              <div key={controlItem.name} className="grid gap-2">
                <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                <Input
                  id={controlItem.name}
                  name={controlItem.name}
                  placeholder={controlItem.placeholder}
                  type={controlItem.type}
                  value={addNewUserFormData[controlItem.name]}
                  onChange={(e) =>
                    setAddNewUserFormData({
                      ...addNewUserFormData,
                      [controlItem.name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <DialogFooter className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={!handleSaveButtonValid()} type="submit">
                {currentEditedId ? "Save Changes" : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
