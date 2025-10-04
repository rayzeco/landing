import React, { useState, useEffect } from 'react';
import { createRetryableRequest } from '../../utils/authUtils';
import './timeout-modal.scss';

const TimeoutModal = ({ isVisible, onClose, onRetry, errorDetails, retryFunction }) => {
  const [countdown, setCountdown] = useState(30); // 30 second countdown
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      // Reset state when modal closes
      setCountdown(30);
      setIsRetrying(false);
      setRetryAttempt(0);
      return;
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Auto-close when countdown reaches 0
          if (onClose) onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-close after 30 seconds
    const autoCloseTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 30000);

    // Cleanup timers on unmount or when modal closes
    return () => {
      clearInterval(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [isVisible, onClose]);

  const handleRetry = async () => {
    if (!retryFunction || isRetrying) return;

    setIsRetrying(true);
    setRetryAttempt(prev => prev + 1);

    try {
      // Create a retryable version of the function
      const retryableFunction = createRetryableRequest(retryFunction, 2, 1000);
      await retryableFunction();

      // Success - close modal
      if (onClose) onClose();
      if (onRetry) onRetry(true);
    } catch (error) {
      console.error('Retry failed:', error);
      if (onRetry) onRetry(false);
      // Keep modal open to allow manual retry or dismiss
    } finally {
      setIsRetrying(false);
    }
  };

  const handleDismiss = () => {
    if (onClose) onClose();
  };

  const formatUrl = (url) => {
    if (!url) return 'Unknown endpoint';
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="timeout-modal-overlay">
      <div className="timeout-modal">
        <div className="timeout-modal-header">
          <h2>Connection Timeout</h2>
          <div className="timeout-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f59e0b"/>
            </svg>
          </div>
        </div>

        <div className="timeout-modal-body">
          <p className="timeout-message">
            The request is taking longer than expected. This might be due to:
          </p>

          <ul className="timeout-causes">
            <li>🌐 Slow internet connection</li>
            <li>🔄 Server processing delay</li>
            <li>📡 Network connectivity issues</li>
          </ul>

          {errorDetails && (
            <div className="error-details">
              <p><strong>Endpoint:</strong> {formatUrl(errorDetails.url)}</p>
              {retryAttempt > 0 && (
                <p><strong>Retry attempt:</strong> {retryAttempt}</p>
              )}
            </div>
          )}

          <div className="countdown-section">
            <p className="countdown-text">
              This dialog will close automatically in <span className="countdown-number">{countdown}</span> seconds
            </p>
          </div>

          <div className="timeout-actions">
            <button
              className="btn-primary retry-btn"
              onClick={handleRetry}
              disabled={isRetrying || !retryFunction}
            >
              {isRetrying ? (
                <>
                  <span className="loading-spinner"></span>
                  Retrying...
                </>
              ) : (
                <>
                  🔄 Retry Request
                </>
              )}
            </button>

            <button
              className="btn-secondary dismiss-btn"
              onClick={handleDismiss}
              disabled={isRetrying}
            >
              Dismiss
            </button>
          </div>

          <div className="timeout-tips">
            <h4>💡 Tips to resolve this:</h4>
            <ul>
              <li>Check your internet connection</li>
              <li>Wait a moment and try again</li>
              <li>Refresh the page if the problem persists</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeoutModal;