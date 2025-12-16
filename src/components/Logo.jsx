import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'} title='Home' className='font-pbold text-2xl flex items-center justify-center gap-x-2 outline-none' >
      <span>Blogify</span>
      <span className='w-2 h-2 rounded bg-btn animate-bounce'></span>
    </Link>
  )
}

export default Logo
