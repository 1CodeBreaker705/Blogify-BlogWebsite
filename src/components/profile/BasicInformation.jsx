import { ErrorMessage, Field,Form, Formik } from 'formik'
import React from 'react'
import { TiCancel } from 'react-icons/ti'
import CustomLoaderButton from '../CustomLoaderButton'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { AuthSlicePath } from '../../redux/slices/Auth.slice'
import { appwriteAccount, appwriteDatabase } from '../../lib/appwrite'
import { ENVObj } from '../../lib/constant'
import { ID } from 'appwrite';
import { useMainContext } from '../../context/MainContext'

const BasicInformation = () => {
  const {fetchUser}=useMainContext()
  const authUser=useSelector(AuthSlicePath)
  const initialValues={
    name:authUser?.name || '',
    bio:authUser?.profile?.bio || ''
  }
  const validationSchema=yup.object({
    name:yup.string().required("Name is required"),
    bio:yup.string()
  })
  const onSubmitHandler=async(values,helpers)=>{
       try {
          if(values.name !== authUser.name){
            //update name from auth profile
            await appwriteAccount.updateName(values.name)
          }
           await appwriteDatabase.updateDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,authUser.profile.$id,{
            bio:values.bio,
            name:values.name
           })
         toast.success("Profile Updated")
       } catch (error) {
         toast.error(error.message)
       }finally{
         await fetchUser()
       }
  }
  return (
    <>
      <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialValues}>
        <Form action="" className=' w-[90%] md:w-1/2 lg:w-1/3 py-3 px-3 mx-auto'>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field type="text" name='name' id='name' className='w-full py-2 bg-black/40 placeholder:font-psemibold rounded px-2 outline-none border-b border-transparent focus:border-btn transition-all duration-200 focus:rounded-none' placeholder='Enter your name' />
             <ErrorMessage name='name' render={(str)=>
                            <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                              <TiCancel/>
                              <span>{str}</span>
                              </p>}/>
          </div>
          <div className='mb-3'>
                         <label htmlFor="email">Email</label>
                         <input value={authUser.email} readOnly disabled id='email' placeholder='Enter your email' className='w-full py-2 bg-black/40 placeholder:font-psemibold rounded px-2 outline-none border-b border-transparent focus:border-btn transition-all duration-200 focus:rounded-none cursor-not-allowed' />
                         
          </div>
          <div className="mb-3">
            <label htmlFor="bio">Bio</label>
            <Field as='textarea' rows='5' name='bio' id='bio' className='w-full py-2 bg-black/40 placeholder:font-psemibold rounded px-2 outline-none border-b border-transparent focus:border-btn transition-all duration-200 focus:rounded-none resize-none' placeholder='Enter your bio' />
          </div>
          <div className="div mb-3">
            <CustomLoaderButton text='Update Profile'/>
          </div>
          
        </Form>
      </Formik>
    </>
  )
}

export default BasicInformation
