import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='py-5 bg-section mt-15'>
      <p className="text-center">Copyright<span className='text-btn font-pbold'>@</span><span>{new Date().getFullYear()}</span></p>
    </div>
  )
}

export default Footer
