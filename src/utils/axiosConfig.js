import axios from 'axios';
import { handleTokenExpiration, handleTimeout } from './authUtils';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
});

// Flag to prevent multiple token expiration modals
let isTokenExpirationHandled = false;

// Response interceptor to handle token expiration and timeouts
apiClient.interceptors.response.use(
  (response) => {
    // Reset flag on successful response
    isTokenExpirationHandled = false;
    return response;
  },
  (error) => {
    // Check for timeout conditions
    const isTimeout =
      error.code === 'ECONNABORTED' ||
      error.message?.includes('timeout') ||
      error.message?.includes('Network Error');

    // Check for token expiration conditions
    const isTokenExpired =
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.data?.detail?.includes('token') ||
      error.response?.data?.detail?.includes('expired') ||
      error.response?.data?.detail?.includes('invalid') ||
      error.response?.data?.message?.includes('token') ||
      error.response?.data?.message?.includes('expired');

    // Handle timeout first, as it's a different type of issue
    if (isTimeout) {
      console.warn('Request timed out:', error.config?.url);
      handleTimeout(error);
      return Promise.reject({
        ...error,
        isTimeout: true,
        userMessage: 'The request is taking longer than expected. Please check your connection and try again.'
      });
    }

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