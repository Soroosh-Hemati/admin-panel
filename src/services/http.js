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
  getAllCategories: async () => await axiosInstance.get("category"),
  addNewCategory: async (data) =>
    await axiosInstance.post("create-category", data),
  deleteCategory: async (id) =>
    await axiosInstance.delete(`delete-category/${id}`),
  getSingleCategory: async (id) => await axiosInstance.get(`category/${id}`),
  editCategory: async (id, data) =>
    await axiosInstance.put(`update-category/${id}`, data),
  getAllProducts: async () => await axiosInstance.get("products"),
  getSingleProduct: async (id) => await axiosInstance.get(`product/${id}`),
  addNewProduct: async (data) =>
    await axiosInstance.post("create_product", data),
  editProduct: async (id, data) =>
    await axiosInstance.put(`product/${id}`, data),
  deleteProduct: async (id) => await axiosInstance.delete(`product/${id}`),
  addNewArticle: async (data) =>
    await axiosInstance.post("create_articles", data),
  getAllArticles: async () => await axiosInstance.get("articles"),
  deleteArticle: async (id) => await axiosInstance.delete(`article/${id}`),
  getSingleArticle: async (id) => await axiosInstance.get(`article/${id}`),
  editArticle: async (id, data) =>
    await axiosInstance.put(`article/${id}`, data),
};

export default httpService;
