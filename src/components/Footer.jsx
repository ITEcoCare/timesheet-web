import React from 'react'

const Footer = () => {
  return (
    <div className='py-5 text-center'>
      <p className='text-xs mt-2 text-green-700'>
        &copy; {new Date().getFullYear()} PT Indocare Pacific (ecoCare). All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer