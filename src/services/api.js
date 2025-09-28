import axios from "axios";

const api = axios.create({
  baseURL: "http://98.70.26.80:8058/api/", // Spring Boot backend
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    hasToken: !!token,
    tokenPrefix: token ? token.substring(0, 20) + '...' : 'None'
  });
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      message: error.response?.data?.message || error.message
    });
    
    // Handle authentication errors globally
    if (error.response?.status === 401) {
      console.warn('Authentication failed - clearing stored credentials');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

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

// Profile API - matches your ProfileController
export const profileAPI = {
  // Get user profile
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Making profile request with token:', token ? 'Present' : 'Missing');
      
      const response = await api.get('/profile');
      console.log('Profile API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      
      if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('Access forbidden. Invalid authentication.');
      } else if (error.response?.status === 404) {
        throw new Error('Profile not found. Please create your profile first.');
      } else if (error.response?.data) {
        throw new Error(error.response.data.message || 'Failed to load profile');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Making profile update request with token:', token ? 'Present' : 'Missing');
      console.log('Sending profile data:', profileData);
      
      const response = await api.put('/profile', profileData);
      console.log('Profile update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      
      if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('Access forbidden. Invalid authentication.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid profile data. Please check all fields.');
      } else if (error.response?.data) {
        throw new Error(error.response.data.message || 'Failed to update profile');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Alternative methods using path parameters for email (matches your controller structure)
  getUserProfileByEmail: async (email) => {
    try {
      console.log('Making profile request by email path param:', email);
      
      // Use path parameter instead of request body
      const encodedEmail = encodeURIComponent(email);
      const response = await api.get(`/profile/user/${encodedEmail}`);
      console.log('Profile by email response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile by email:', error);
      
      if (error.response?.status === 404) {
        throw new Error('Profile not found for this user.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid email format.');
      }
      throw error;
    }
  },

  updateUserProfileByEmail: async (email, profileData) => {
    try {
      console.log('Updating profile by email path param:', email, profileData);
      
      // Use path parameter for email and send profile data in body
      const encodedEmail = encodeURIComponent(email);
      const response = await api.put(`/profile/user/${encodedEmail}`, profileData);
      console.log('Profile update by email response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile by email:', error);
      
      if (error.response?.status === 404) {
        throw new Error('User not found.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid profile data.');
      }
      throw error;
    }
  },

  // New method for multipart form data with file upload (matches your updated ProfileController)
  updateUserProfileByEmailWithFile: async (email, formData) => {
    try {
      console.log('Updating profile with file by email path param:', email);
      
      // Use path parameter for email and send FormData (multipart/form-data)
      const encodedEmail = encodeURIComponent(email);
      const response = await api.put(`/profile/user/${encodedEmail}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile update with file response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile with file by email:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.status === 404) {
        throw new Error('User not found.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid profile data or file format.');
      } else if (error.response?.status === 413) {
        throw new Error('File too large. Please select a smaller image.');
      }
      throw error;
    }
  }
};

export default api;
