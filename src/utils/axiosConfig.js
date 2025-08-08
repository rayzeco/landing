import axios from 'axios';
import { handleTokenExpiration } from './authUtils';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
});

// Flag to prevent multiple token expiration modals
let isTokenExpirationHandled = false;

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    // Reset flag on successful response
    isTokenExpirationHandled = false;
    return response;
  },
  (error) => {
    // Check for token expiration conditions
    const isTokenExpired = 
      error.response?.status === 401 || 
      error.response?.status === 403 ||
      error.response?.data?.detail?.includes('token') ||
      error.response?.data?.detail?.includes('expired') ||
      error.response?.data?.detail?.includes('invalid') ||
      error.response?.data?.message?.includes('token') ||
      error.response?.data?.message?.includes('expired');

    // Handle token expiration only once
    if (isTokenExpired && !isTokenExpirationHandled) {
      isTokenExpirationHandled = true;
      console.warn('Token expired, redirecting to login...');
      handleTokenExpiration();
    }

    return Promise.reject(error);
  }
);

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;