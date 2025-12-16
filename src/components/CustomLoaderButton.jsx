import React from 'react'
import clsx from 'clsx'
import { ImSpinner2 } from "react-icons/im";

const CustomLoaderButton = ({type='submit',isLoading=false,className,text}) => {
  return (
    <button type={type} disabled={isLoading} className={clsx(className,'w-full bg-btn hover:bg-btn-hover text-white py-2 rounded outline-none cursor-pointer disabled:cursor-auto transition-all duration-200 disabled:bg-rose-800 flex items-center justify-center')}>
      {isLoading?<ImSpinner2 className='animate-spin text-white text-2xl' style={{ animationDuration: '0.7s' }}/>:<span>{text}</span>}
    </button>
  )
}

export default CustomLoaderButton


