import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Worker endpoints
  getWorkers: async (params = {}) => {
    try {
      const response = await api.get('/workers/', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch workers');
    }
  },

  getWorker: async (id) => {
    try {
      const response = await api.get(`/workers/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch worker details');
    }
  },

  // Booking endpoints
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings/create/', bookingData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw new Error('Failed to create booking');
    }
  },

  getBookings: async (params = {}) => {
    try {
      const response = await api.get('/bookings/', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch bookings');
    }
  },

  updateBooking: async (id, data) => {
    try {
      const response = await api.patch(`/bookings/${id}/`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update booking');
    }
  },

  // Statistics endpoints
  getWorkerStats: async () => {
    try {
      const response = await api.get('/stats/workers/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch worker statistics');
    }
  },

  getBookingStats: async () => {
    try {
      const response = await api.get('/stats/bookings/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch booking statistics');
    }
  },

  // Filter choices
  getFilterChoices: async () => {
    try {
      const response = await api.get('/choices/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch filter choices');
    }
  },
};

// Helper function to build query string
export const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  return queryParams.toString();
};

// Helper function to format errors
export const formatError = (error) => {
  if (error.response?.data) {
    const errorData = error.response.data;
    
    if (typeof errorData === 'string') {
      return errorData;
    }
    
    if (errorData.detail) {
      return errorData.detail;
    }
    
    if (errorData.error) {
      return errorData.error;
    }
    
    // Handle field validation errors
    if (typeof errorData === 'object') {
      const fieldErrors = [];
      Object.entries(errorData).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          fieldErrors.push(`${field}: ${messages.join(', ')}`);
        } else {
          fieldErrors.push(`${field}: ${messages}`);
        }
      });
      
      if (fieldErrors.length > 0) {
        return fieldErrors.join('\n');
      }
    }
  }
  
  return error.message || 'An unexpected error occurred';
};

export default api;