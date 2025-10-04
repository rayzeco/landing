import './layout.scss'

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import TokenExpiredModal from '../../components/TokenExpiredModal/TokenExpiredModal'
import TimeoutModal from '../../components/TimeoutModal/TimeoutModal'
import { onTokenExpiration, offTokenExpiration, onTimeout, offTimeout } from '../../utils/authUtils'

export default function Layout({children}) {
  const location = useLocation();
  const isConsolePage = location.pathname === '/console';
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [timeoutErrorDetails, setTimeoutErrorDetails] = useState(null);
  const [timeoutRetryFunction, setTimeoutRetryFunction] = useState(null);

  useEffect(() => {
    // Register callback for token expiration
    const handleTokenExpiration = () => {
      setShowTokenExpiredModal(true);
    };

    // Register callback for timeout
    const handleTimeoutOccurred = (errorDetails) => {
      setTimeoutErrorDetails(errorDetails);
      setShowTimeoutModal(true);
    };

    onTokenExpiration(handleTokenExpiration);
    onTimeout(handleTimeoutOccurred);

    // Cleanup callbacks on unmount
    return () => {
      offTokenExpiration(handleTokenExpiration);
      offTimeout(handleTimeoutOccurred);
    };
  }, []);

  const handleCloseTokenModal = () => {
    setShowTokenExpiredModal(false);
  };

  const handleCloseTimeoutModal = () => {
    setShowTimeoutModal(false);
    setTimeoutErrorDetails(null);
    setTimeoutRetryFunction(null);
  };

  const handleTimeoutRetry = (success) => {
    if (success) {
      // Successful retry, close modal
      handleCloseTimeoutModal();
    }
    // If failed, keep modal open for manual retry or dismiss
  };

  return (
    <div id='layout'>
      {!isConsolePage && <Header />}
      <ScrollToTopButton />
      <main>
        {children}
      </main>
      {!isConsolePage && <Footer />}

      {/* Token Expiration Modal */}
      <TokenExpiredModal
        isVisible={showTokenExpiredModal}
        onClose={handleCloseTokenModal}
      />

      {/* Timeout Modal */}
      <TimeoutModal
        isVisible={showTimeoutModal}
        onClose={handleCloseTimeoutModal}
        onRetry={handleTimeoutRetry}
        errorDetails={timeoutErrorDetails}
        retryFunction={timeoutRetryFunction}
      />
    </div>
  )
}
