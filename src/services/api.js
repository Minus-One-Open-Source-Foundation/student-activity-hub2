import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot backend
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API functions
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      return response.data;
    } catch (error) {
      // Handle HTTP error responses
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },
  
  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password 
      });
      return response.data;
    } catch (error) {
      // Handle HTTP error responses  
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
};

export default api;
