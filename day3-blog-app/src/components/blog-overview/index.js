"use client";
import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const initialBlogFormData = { title: "", description: "" };

function BlogOverview({ blogList }) {
  const [loading, setLoading] = useState(false);
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(blogFormData),
            })
          : await fetch(`/api/add-blog`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(blogFormData),
            });

      const result = await apiResponse.json();

      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogID(null);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
    } catch (e) {
      console.log(e);
    }
  }

  function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
      {/* Add New Blog Dialog */}
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card
              key={blogItem._id}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <CardContent>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  {blogItem?.title}
                </CardTitle>
                <CardDescription className="text-gray-700 mb-6">
                  {blogItem?.description}
                </CardDescription>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300" onClick={() => handleEdit(blogItem)}>
                    Edit
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 transition-colors duration-300" onClick={() => handleDeleteBlogByID(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold text-white col-span-full text-center mt-12">
            No Blog Found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
