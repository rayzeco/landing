import './layout.scss'

import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

export default function Layout({children}) {
  return (
    <div id='layout'>
      <Header />
      <ScrollToTopButton />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
