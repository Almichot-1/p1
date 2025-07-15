import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for handling requests
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Worker API endpoints
export const workerApi = {
  // Get all workers with optional filters
  getWorkers: (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/workers/?${params.toString()}`);
  },
  
  // Get a specific worker by ID
  getWorker: (id) => api.get(`/workers/${id}/`),
  
  // Search workers
  searchWorkers: (query, filters = {}) => {
    const params = new URLSearchParams({ search: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/workers/?${params.toString()}`);
  },
};

// Booking API endpoints
export const bookingApi = {
  // Create a new booking request
  createBooking: (bookingData) => api.post('/bookings/', bookingData),
  
  // Get all booking requests (admin only)
  getBookings: (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/bookings/list/?${params.toString()}`);
  },
  
  // Update booking status (admin only)
  updateBookingStatus: (id, status) => 
    api.patch(`/bookings/${id}/`, { status }),
};

export default api;