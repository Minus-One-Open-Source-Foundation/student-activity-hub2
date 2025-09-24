import axios from "axios";

const api = axios.create({
  baseURL: "http://98.70.26.80:8058/api/", // Spring Boot backend
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
    const requestData = { 
      username: name,  // Your DTO expects 'username', not 'name'
      email, 
      password,
      role: "STUDENT"  // Your DTO requires a 'role' field
    };
    console.log('Sending registration request:', requestData); // Debug log
    
    try {
      const response = await api.post('/auth/register', requestData);
      console.log('API register response status:', response.status); // Debug log
      console.log('API register response data:', response.data); // Debug log
      
      // If we get here, the request was successful (status 200-299)
      return response.data;
    } catch (error) {
      console.error('API register error:', error); // Debug log
      
      // Only throw for actual HTTP errors (400, 500, etc.)
      if (error.response) {
        // This is an HTTP error response from your backend
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
        
        // Extract the actual error message from your AuthResponse
        const errorMessage = error.response.data?.message || 'Registration failed';
        throw new Error(errorMessage);
      }
      
      // Network error
      throw new Error('Network error - please check your connection');
    }
  }
};

export default api;
