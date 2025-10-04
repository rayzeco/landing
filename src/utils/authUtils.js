// Token expiration event dispatcher
let tokenExpirationCallbacks = [];

// Timeout handling event dispatcher
let timeoutCallbacks = [];

/**
 * Register a callback to be called when token expires
 * @param {Function} callback - Function to call when token expires
 */
export const onTokenExpiration = (callback) => {
  tokenExpirationCallbacks.push(callback);
};

/**
 * Remove a token expiration callback
 * @param {Function} callback - Function to remove
 */
export const offTokenExpiration = (callback) => {
  tokenExpirationCallbacks = tokenExpirationCallbacks.filter(cb => cb !== callback);
};

/**
 * Handle token expiration - clear data and trigger callbacks
 */
export const handleTokenExpiration = () => {
  try {
    // Store current page for redirect after re-login
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath !== '/login' && currentPath !== '/') {
      localStorage.setItem('redirectAfterLogin', currentPath);
    }

    // Clear session data
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Clear any other auth-related localStorage items
    localStorage.removeItem('selectedClientId');
    localStorage.removeItem('selectedProjectIds');
    localStorage.removeItem('activeTab');

    // Trigger all registered callbacks (will show modal)
    tokenExpirationCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in token expiration callback:', error);
      }
    });

  } catch (error) {
    console.error('Error handling token expiration:', error);
    // Fallback: direct redirect to login
    window.location.href = '/login';
  }
};

/**
 * Check if token is expired by decoding JWT (optional proactive check)
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if we can't parse
  }
};

/**
 * Get remaining time until token expires (in seconds)
 * @param {string} token - JWT token to check
 * @returns {number} - Seconds until expiration, 0 if expired
 */
export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    const remaining = payload.exp - currentTime;
    return Math.max(0, remaining);
  } catch (error) {
    console.error('Error getting token time remaining:', error);
    return 0;
  }
};

/**
 * Redirect to login page with current path stored for return
 */
export const redirectToLogin = () => {
  // Clear any existing timers or intervals
  if (window.tokenExpirationTimer) {
    clearTimeout(window.tokenExpirationTimer);
  }
  
  // Redirect to login
  window.location.href = '/login';
};

/**
 * Get the path to redirect to after successful login
 * @returns {string} - Path to redirect to, or '/' if none stored
 */
export const getRedirectPath = () => {
  const redirectPath = localStorage.getItem('redirectAfterLogin');
  if (redirectPath) {
    localStorage.removeItem('redirectAfterLogin');
    return redirectPath;
  }
  return '/';
};

/**
 * Register a callback to be called when timeout occurs
 * @param {Function} callback - Function to call when timeout occurs
 */
export const onTimeout = (callback) => {
  timeoutCallbacks.push(callback);
};

/**
 * Remove a timeout callback
 * @param {Function} callback - Function to remove
 */
export const offTimeout = (callback) => {
  timeoutCallbacks = timeoutCallbacks.filter(cb => cb !== callback);
};

/**
 * Handle timeout - trigger callbacks to show timeout modal
 * @param {Object} error - The timeout error object
 */
export const handleTimeout = (error) => {
  try {
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
      timeout: error.config?.timeout,
      message: error.message,
      timestamp: new Date().toISOString()
    };

    console.warn('Timeout occurred:', errorDetails);

    // Trigger all registered callbacks (will show timeout modal)
    timeoutCallbacks.forEach(callback => {
      try {
        callback(errorDetails);
      } catch (callbackError) {
        console.error('Error in timeout callback:', callbackError);
      }
    });

  } catch (error) {
    console.error('Error handling timeout:', error);
  }
};

/**
 * Create a retry function for failed requests
 * @param {Function} requestFunction - The original request function
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} baseDelay - Base delay in ms (default: 1000)
 * @returns {Function} - Retry-enabled request function
 */
export const createRetryableRequest = (requestFunction, maxRetries = 3, baseDelay = 1000) => {
  return async (...args) => {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFunction(...args);
      } catch (error) {
        lastError = error;

        // Don't retry on authentication errors or client errors (4xx)
        if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 408) {
          throw error;
        }

        // Don't retry if this is the last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Calculate exponential backoff delay
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`);

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // All retries failed
    throw lastError;
  };
};