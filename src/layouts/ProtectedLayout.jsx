import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthSlicePath } from '../redux/slices/Auth.slice'
import LoaderComponent from '../components/LoaderComponent'

const ProtectedLayout = () => {
  const [loading,setLoading]=useState(true)
  const authUser=useSelector(AuthSlicePath)
  const location=useLocation()
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!authUser){
        navigate("/")
        setLoading(false)
    }
    setLoading(false)
  },[authUser,navigate])
    
  if(loading){
    return <LoaderComponent/>
  }
  
  return (
    <>
     <Outlet/> 
    </>
  )
}

export default ProtectedLayout
