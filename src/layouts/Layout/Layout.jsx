import './layout.scss'

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import TokenExpiredModal from '../../components/TokenExpiredModal/TokenExpiredModal'
import { onTokenExpiration, offTokenExpiration } from '../../utils/authUtils'

export default function Layout({children}) {
  const location = useLocation();
  const isConsolePage = location.pathname === '/console';
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);

  useEffect(() => {
    // Register callback for token expiration
    const handleTokenExpiration = () => {
      setShowTokenExpiredModal(true);
    };

    onTokenExpiration(handleTokenExpiration);

    // Cleanup callback on unmount
    return () => {
      offTokenExpiration(handleTokenExpiration);
    };
  }, []);

  const handleCloseTokenModal = () => {
    setShowTokenExpiredModal(false);
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
    </div>
  )
}
