import axiosInstance from "../axiosInstance";

// Upload image
export const uploadImage = async (formData) => {
  const res = await axiosInstance.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Get all images
export const getAllImages = async () => {
  const res = await axiosInstance.get("/images/get");
  return res.data;
};

// Delete image by id
export const deleteImage = async (id) => {
  const res = await axiosInstance.delete(`/images/${id}`);
  return res.data;
};
