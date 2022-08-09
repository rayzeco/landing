import './scroll-to-top-button.scss'

import React, { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
 
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  
  return (
    <a href='#header' className={'scroll-to-top-button' + (scrollPosition > 50 ? ' show' : '')}>
      <img src="/images/up-arrow.svg" alt="up-arrow" />
    </a>
  )
}
