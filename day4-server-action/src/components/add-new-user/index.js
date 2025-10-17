'use client'

import { useState } from "react"
import { Button } from "../ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewFromControl, addNewUserFromInitialState } from "../../app/utils/index"

function AddNewUser() {
  const [openPopup, setOpenPopup] = useState(false);
  const [addNewUserFromData, setAddNewUserFromData] = useState(addNewUserFromInitialState);


  console.log(addNewUserFromData);

  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add new User</Button>

      <Dialog open={openPopup} onOpenChange={()=>{
        setOpenPopup(false);
        setAddNewUserFromData(addNewUserFromInitialState)
      }}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter user details below and click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* ✅ Use return inside map */}
              {addNewFromControl.map((controlItem) => (
                <div key={controlItem.name} className="grid gap-2">
                  <Label htmlFor={controlItem.name} className="text-right">
                    {controlItem.label}
                  </Label>
                  <Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    className="col-span-3"
                    type={controlItem.type}
                    value={addNewUserFromData[controlItem.name]}
                    onChange={(event)=>{
                      setAddNewUserFromData({
                        ...addNewUserFromData,
                        [controlItem.name] : event.target.value
                      })
                    }}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default AddNewUser
