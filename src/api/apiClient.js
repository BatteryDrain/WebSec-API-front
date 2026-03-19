import api from "./api";

export const apiFetch = async ({
    url,
    method = "GET",
    data,
    params,
    headers = {},
  }) => {
    try {
      const response = await api({
        url,
        method,
        data,
        params,
        headers,
      });
  
      return response.data;
  
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  };