import api from "./api";

const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

export const apiFetch = async ({
  url,
  method = "GET",
  data,
  params,
  headers = {},
}) => {
  try {
    const token = getToken();

    const authHeaders = {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

      const response = await api({
        url,
        method,
        data,
        params,
        headers: authHeaders, 
      });
  
      return response.data;
  
    } catch (error) {

      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      console.error(`API Error [${status}]:`, message);
    
      const enhancedError = new Error(message);
      enhancedError.status = status;
      throw enhancedError;
    }
  };