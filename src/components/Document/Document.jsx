import './document.scss'

import React, { useEffect } from 'react'

export default function Document({children}) {

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className='document'>
      <div className='container'>
        <div className='content'>
          {children}
        </div>
      </div>
    </div>
  )
}
