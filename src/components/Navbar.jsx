import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import { AuthSlicePath } from '../redux/slices/Auth.slice'
import { useMainContext } from '../context/MainContext'
import CustomProfileButton from './CustomProfileButton'

const Navbar = () => {

  const user=useSelector(AuthSlicePath)

  const {logoutHandler}=useMainContext();

  return (
    <header className='w-full bg-section py-5'>
      <nav className='w-[96%] lg:w-[90%] xl:w-[80%] mx-auto flex justify-between items-center text-sm lg:text-base'>
        <Logo/>
        <ul className="flex items-center gap-x-2">
          <li><NavbarLink to='/' title="Home"/></li>
          <li><NavbarLink to='/about' title="About"/></li>
          {user?<CustomProfileButton/>:<li><Link to={'/login'} className=' bg-btn px-4 py-1 font-medium rounded hover:bg-btn-hover transition-all duration-300 outline-none cursor-pointer '>Login</Link></li>}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

const NavbarLink=({to,title})=>{

  const {pathname}=useLocation()

   return <Link to={to} title={title} className={clsx('px-2 py-1 font-medium border-b-2 transition-all duration-300',pathname==to && 'bg-btn rounded ')}>{title}</Link>
}
