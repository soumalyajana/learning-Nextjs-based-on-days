import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // backend URL
  withCredentials: false,
});

// Add a request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
