"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  setBlogFormData,
  blogFormData,
  handleSaveBlogData,
  currentEditedBlogID,
  setCurrentEditedBlogID,
}) {
  return (
    <Fragment>
      <div className="mb-6 text-center">
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-300" onClick={() => setOpenBlogDialog(true)}>
          Add New Blog
        </Button>
      </div>

      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({ title: "", description: "" });
          setCurrentEditedBlogID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {currentEditedBlogID ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Title Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-medium text-gray-700">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, title: e.target.value })
                }
                id="title"
                className="col-span-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right font-medium text-gray-700">
                Description
              </Label>
              <Input
                name="description"
                placeholder="Enter blog description"
                value={blogFormData.description}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, description: e.target.value })
                }
                id="description"
                className="col-span-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={handleSaveBlogData}
              type="button"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-300 w-full"
            >
              {loading ? "Saving changes..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddNewBlog;
