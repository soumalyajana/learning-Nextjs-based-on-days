import axiosInstance from "../axiosInstance";

// ✅ Register User
export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/auth/register", userData);
  return res.data;
};

// ✅ Login User
export const loginUser = async (userData) => {
  const res = await axiosInstance.post("/auth/login", userData);
  return res.data;
};

// ✅ Change Password (for logged-in users)
export const changePassword = async (passwordData) => {
  const res = await axiosInstance.post("/auth/change-password", passwordData);
  return res.data;
};

// ✅ Get Current User
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};
