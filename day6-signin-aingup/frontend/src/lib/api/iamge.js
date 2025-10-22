import axiosInstance from "../axiosInstance";

// Fetch all images
export const getAllImages = async () => {
  const res = await axiosInstance.get("/images/get");
  return res.data;
};



export const uploadImage = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  const res = await axiosInstance.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ✅ must send token
    },
  });
  return res.data;
};


// Delete image by id
export const deleteImage = async (id) => {
  const res = await axiosInstance.delete(`/images/${id}`);
  return res.data;
};
