'use client';
import { createContext, useState } from "react";
import {addNewUserInitialState} from '@/app/utils'

// Context (PascalCase)
export const UserContext = createContext(null);

// Provider component
export default function UserProvider({ children }) {

  const [openPopup, setOpenPopup] = useState(false);
  const [addNewUserFormData, setAddNewUserFormData] = useState(addNewUserInitialState);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  return (
    <UserContext.Provider value={{ currentEditedId, setCurrentEditedId ,openPopup, setOpenPopup , addNewUserFormData, setAddNewUserFormData}}>
      {children}
    </UserContext.Provider>
  );
}

// Optional: easier debugging in React DevTools
UserContext.displayName = "UserContext";
