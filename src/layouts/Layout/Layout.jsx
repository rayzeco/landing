import './layout.scss'

import React from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

export default function Layout({children}) {
  const location = useLocation();
  const isConsolePage = location.pathname === '/console';

  return (
    <div id='layout'>
      {!isConsolePage && <Header />}
      <ScrollToTopButton />
      <main>
        {children}
      </main>
      {!isConsolePage && <Footer />}
    </div>
  )
}
