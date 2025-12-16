import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = () => {

  const navigate=useNavigate()

  return (
    <>
     <button type='button' onClick={()=>navigate(-1)} className='flex items-center justify-center text-sm lg:text-base bg-section py-1 px-2 mb-2 rounded cursor-pointer hover:text-btn transition-all' >
        <IoIosArrowRoundBack className='text-2xl lg:text-3xl'/>
        <span>Back</span>
     </button> 
    </>
  )
}

export default BackButton
