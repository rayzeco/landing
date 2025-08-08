import React, { useState, useEffect } from 'react';
import { redirectToLogin } from '../../utils/authUtils';
import './token-expired-modal.scss';

const TokenExpiredModal = ({ isVisible, onClose }) => {
  const [countdown, setCountdown] = useState(10); // 10 second countdown

  useEffect(() => {
    if (!isVisible) return;

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Auto-redirect when countdown reaches 0
          redirectToLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-redirect after 10 seconds
    const autoRedirectTimer = setTimeout(() => {
      redirectToLogin();
    }, 10000);

    // Cleanup timers on unmount or when modal closes
    return () => {
      clearInterval(timer);
      clearTimeout(autoRedirectTimer);
    };
  }, [isVisible]);

  const handleReloginClick = () => {
    // Clear timers and redirect immediately
    setCountdown(0);
    redirectToLogin();
  };

  const handleStayLoggedOut = () => {
    // Clear session and go to home page
    if (onClose) onClose();
    window.location.href = '/';
  };

  if (!isVisible) return null;

  return (
    <div className="token-expired-overlay">
      <div className="token-expired-modal">
        <div className="token-expired-header">
          <h2>Session Expired</h2>
          <div className="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 16.55 6.84 20.74 11.05 21.95C11.34 22.02 11.66 22.02 11.95 21.95C16.16 20.74 20 16.55 20 12V7L12 2ZM12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15Z" fill="#f59e0b"/>
            </svg>
          </div>
        </div>
        
        <div className="token-expired-body">
          <p className="token-expired-message">
            Your session has expired for security reasons. Please log in again to continue using Rayze.
          </p>
          
          <div className="countdown-section">
            <p className="countdown-text">
              Auto-redirecting to login in <span className="countdown-number">{countdown}</span> seconds...
            </p>
          </div>
          
          <div className="security-note">
            <p>🔒 This helps protect your account from unauthorized access</p>
          </div>
        </div>

        <div className="token-expired-footer">
          <button 
            className="btn-primary relogin-btn"
            onClick={handleReloginClick}
          >
            Re-login Now
          </button>
          <button 
            className="btn-secondary stay-out-btn"
            onClick={handleStayLoggedOut}
          >
            Stay Logged Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiredModal;