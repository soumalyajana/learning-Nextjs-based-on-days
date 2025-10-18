// src/actions/index.server.js
'use server';

import connectToDB from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function handleAddNewUserAction(formData) {
  await connectToDB();

  try {
    const newUser = await User.create(formData);

    if (newUser) {
      return {
        success: true,
        message: "User added successfully ✅",
      };
    }
  } catch (error) {
    console.error("❌ Error adding user:", error);
    return {
      success: false,
      message: "Internal server error ❌",
    };
  }
}


export async function fetchUserActions() {
  await connectToDB();
  try {
    const fetchAllUser = await User.find({});
    if(fetchAllUser){
      return{
        success : true,
        data : JSON.parse(JSON.stringify(fetchAllUser)),

      };
    }else{
      return {
        success : false,
        message : "some error occured ! please try again later"
      }
    }

  }catch(e){
    return {
      success : false,
      message : "some error occured ! please try again later"
    }
  }
}

export async function deleteUserAction(currentUserID, pathToRevalidate) {
  await connectToDB();

  try {
    const deletedUser = await User.findByIdAndDelete(currentUserID);

    if (deletedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Deleted user successfully ✅",
      };
    } else {
      return {
        success: false,
        message: "Unable to delete user. Please try again later ❌",
      };
    }
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return {
      success: false,
      message: "Internal server error ❌",
    };
  }
}