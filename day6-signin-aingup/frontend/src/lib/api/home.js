import axiosInstance from "../axiosInstance";

export const fetchHome = async () => {
  const res = await axiosInstance.get("/home/welcome");
  return res.data;
};
