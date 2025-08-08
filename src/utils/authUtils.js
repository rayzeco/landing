// Token expiration event dispatcher
let tokenExpirationCallbacks = [];

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