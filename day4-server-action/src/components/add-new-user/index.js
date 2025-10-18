'use client';

import { useState } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addNewFormControl, addNewUserInitialState } from "../../app/utils";
import { handleAddNewUserAction } from "@/actions" // ✅ server action

export default function AddNewUser() {
  const [openPopup, setOpenPopup] = useState(false);
  const [addNewUserFormData, setAddNewUserFormData] = useState(addNewUserInitialState);

  const handleSaveButtonValid = () =>
    Object.values(addNewUserFormData).every((value) => value.trim() !== "");

  const handleSubmit = async (event) => {

    try {
      const result = await handleAddNewUserAction(addNewUserFormData); // Server action
      console.log(result); // Should log success message

      setOpenPopup(false);
      setAddNewUserFormData(addNewUserInitialState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Button onClick={() => setOpenPopup(true)}>Add New User</Button>

      <Dialog
        open={openPopup}
        onOpenChange={(open) => {
          if (!open) setAddNewUserFormData(addNewUserInitialState);
          setOpenPopup(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter user details below and click save when you&apos;re done.
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={!handleSaveButtonValid()} type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
