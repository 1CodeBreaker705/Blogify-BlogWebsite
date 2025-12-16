import React, { useState } from 'react'
import Logo from '../components/Logo'
import CustomLoaderButton from '../components/CustomLoaderButton'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {toast} from 'react-hot-toast'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { TiCancel } from "react-icons/ti";
import { appwriteAccount, appwriteDatabase } from '../lib/appwrite'
import { ID } from 'appwrite'
import { useDispatch } from 'react-redux'
import { removeUser, setUser } from '../redux/slices/Auth.slice'
import { useMainContext } from '../context/MainContext'
import { ENVObj } from '../lib/constant'

const RegisterPage = () => {

  const [isHidden,setIsHidden]=useState(true)

  const [loading,setLoading]=useState(false)

  const {fetchUser}=useMainContext()

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const validationSchema=yup.object({
    name:yup.string().required("Name is required"),
    email:yup.string().email("Enter a valid email.").required("Email is required"),
    password:yup.string().min(8,"Password must be at least 8 characters long.").required("Password is required")
  })

  const initialValues={
     name:'',
     email:'',
     password:''
  }

  const onSubmitHandler=async(values,helpers)=>{
      try {
        setLoading(true)
        try {                                  //delete current session before starting new one
          const old_user= await appwriteAccount.get()
          if(old_user){
            await appwriteAccount.deleteSession('current');
            dispatch(removeUser())
          }
        } catch (error) {
          
        }
        // Register new user
        await appwriteAccount.create(ID.unique(),values.email,values.password,values.name)
        await appwriteAccount.createEmailPasswordSession(values.email,values.password)
        await fetchUser()
        helpers.resetForm();
        navigate("/")
        toast.success("Account Created")
        
      } catch (e) {
        if(e.type=='user_already_exists'){
          toast.error("User already exists")
        }
        else if(e.type=='general_rate_limit_exceeded'){
          toast.error("You're doing that too fast 😅 Please try again in a minute.")
        }
        else{
          toast.error(e.message)
        }
      }finally{
        setLoading(false)
      }
  }

  return (
    <>
      <section className="min-h-[60vh] flex items-center justify-center">
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
        <Form action='' className=' w-[96%] sm:w-[90%] md:w-1/2 lg:w-1/3 mx-auto my-5 py-5 px-4 border border-btn rounded'>
           <div className='mb-3'>
               <label htmlFor="name">Name <span className='text-red-500'>*</span></label>
               <Field id='name' name='name' type="text" placeholder='Enter Your Name' className="w-full py-1 lg:py-2 px-4 rounded border border-zinc-800 focus:border-white outline-none transition-all placeholder:font-psemibold " />
               <ErrorMessage name='name' render={(str)=>
                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                  <TiCancel/>
                  <span>{str}</span>
                  </p>}/>
           </div>
           <div className='mb-3'>
               <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
               <Field id='email' name='email' type="email" placeholder='Enter Your Email' className="w-full py-1 lg:py-2 px-4 rounded border border-zinc-800 focus:border-white  outline-none transition-all placeholder:font-psemibold " />
               <ErrorMessage name='email' render={(str)=>
                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                  <TiCancel/>
                  <span>{str}</span>
                  </p>}/>
           </div>
           <div className='mb-6'>
               <label htmlFor="Password">Password <span className='text-red-500'>*</span></label>
               <div className="w-full flex items-center gap-x-2 px-2 rounded border border-zinc-800 focus-within:border-white  transition-all">
                  <Field id='password' name='password' type={isHidden?'password':'text'} placeholder='Enter Your Password' className="w-full py-1 lg:py-2 px-2  outline-none placeholder:font-psemibold bg-transparent" />    
                  <button type='button' onClick={()=>{setIsHidden(!isHidden)}}>
                     {isHidden?<FaEye className='text-2xl'/>:<FaEyeSlash className='text-2xl'/>}
                  </button>
               </div>
               <ErrorMessage name='password' render={(str)=>
                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                  <TiCancel/>
                  <span>{str}</span>
                  </p>}/>
           </div>
           <div className="div mb-3">
             <CustomLoaderButton isLoading={loading}  className={''} text={'Register'}/>
           </div>
           <div className="mb-3">
            <p className="text-end text-white">Already have an account? <Link to={'/login'} className='text-btn'>Login</Link></p>
           </div>
        </Form>
        </Formik>
      </section>
    </>
  )
}

export default RegisterPage
