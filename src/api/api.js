import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const customError = {
      status,
      data: error.response?.data,
      message: error.response?.data?.message || error.message,
    };

    switch (status) {
      case 401:
        console.warn("Unauthorized - Logging out");
        localStorage.removeItem("token");
       
        break;
      case 403:
        console.warn("Forbidden - Access Denied");
        break;
      case 500:
        console.error("Internal Server Error");
        break;
    }

    return Promise.reject(customError);
  }
);

export default api;