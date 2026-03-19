import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Ensure headers object exists
    config.headers = config.headers || {};

    // Attach token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle JSON only if not FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        console.warn("Bad request");
        break;
      case 401:
        console.warn("Unauthorized");
        localStorage.removeItem("token");
        break;
      case 403:
        console.warn("Forbidden");
        break;
      case 404:
        console.warn("Not found");
        break;
      case 500:
        console.error("Server error");
        break;
      default:
        console.error("Unexpected error");
    }

    return Promise.reject({
      status,
      data: error.response?.data,
      message: error.message,
    });
  }
);

export default api;