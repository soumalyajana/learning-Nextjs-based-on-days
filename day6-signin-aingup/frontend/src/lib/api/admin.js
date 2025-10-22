import axiosInstance from "../axiosInstance";

export const fetchAdminWelcome = async () => {
  const res = await axiosInstance.get("/admin/welcome");
  return res.data;
};
