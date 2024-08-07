// src/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/", // Replace with your API base URL
});

// Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token"); // Or retrieve your token from a more secure storage

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle errors like 401, 403, etc.
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       // Handle token expiration or unauthorized access
//       console.error("Unauthorized, logging out...");
//       // Optionally, log the user out or refresh the token
//     }

//     return Promise.reject(error);
//   }
// );

const httpService = {
  login: async (data) => await axiosInstance.post("users/login", data),
  getAllProducts: async () => await axiosInstance.get("products"),
};

export default httpService;
