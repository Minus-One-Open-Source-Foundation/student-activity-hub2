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

// File upload API (for blob storage)
const fileAPI = axios.create({
  baseURL: "http://98.70.26.80:8058/", // No /api prefix for file endpoints
});

// Add token to file requests if available
fileAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fileService = {
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fileAPI.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data; // This should return the file URL
    } catch (error) {
      console.error('File upload error:', error);
      if (error.response) {
        throw new Error(error.response.data || 'File upload failed');
      }
      throw new Error('Network error during file upload');
    }
  },

  downloadFile: async (filename) => {
    try {
      const response = await fileAPI.get(`/files/download/${filename}`, {
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('File download error:', error);
      throw new Error('File download failed');
    }
  }
};

// Events API - Updated to match your controller exactly
export const eventsAPI = {
  // Create new event with file upload - matches your controller exactly
  createEvent: async (eventData, file) => {
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    formData.append('type', eventData.type); // HACKATHON or WORKSHOP
    formData.append('eventDate', eventData.eventDate); // YYYY-MM-DD format
    formData.append('userEmail', eventData.userEmail);
    
    if (file) {
      formData.append('file', file);
    }

    console.log('Sending event data:', {
      title: eventData.title,
      description: eventData.description,
      type: eventData.type,
      eventDate: eventData.eventDate,
      userEmail: eventData.userEmail,
      hasFile: !!file
    });

    const response = await api.post('/events/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user events
  getUserEvents: async (userEmail) => {
    const response = await api.get(`/events/user/${encodeURIComponent(userEmail)}`);
    return response.data;
  },

  // Get events by type
  getUserEventsByType: async (userEmail, type) => {
    const response = await api.get(`/events/user/${encodeURIComponent(userEmail)}/type/${type}`);
    return response.data;
  },

  // Search events
  searchUserEvents: async (userEmail, query) => {
    const response = await api.get(`/events/user/${encodeURIComponent(userEmail)}/search`, {
      params: { query }
    });
    return response.data;
  },

  // Get event by ID
  getEventById: async (id, userEmail) => {
    const response = await api.get(`/events/${id}/user/${encodeURIComponent(userEmail)}`);
    return response.data;
  },

  // Update event status (for faculty)
  updateEventStatus: async (id, status) => {
    const response = await api.put(`/events/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  // Delete event
  deleteEvent: async (id, userEmail) => {
    const response = await api.delete(`/events/${id}/user/${encodeURIComponent(userEmail)}`);
    return response.data;
  }
};

export default api;
