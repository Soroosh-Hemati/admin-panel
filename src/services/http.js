// src/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/", // Replace with your API base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Request Interceptor:", config);
    let token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    // console.error("Response Interceptor Error:", error);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - Redirect to login");
      Cookies.remove("token");
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

const httpService = {
  login: async (data) => await axiosInstance.post("users/login", data),
  getAllProducts: async () => await axiosInstance.get("products"),
  getAllCategories: async () => await axiosInstance.get("category"),
  addNewCategory: async (data) =>
    await axiosInstance.post("create-category", data),
};

export default httpService;
