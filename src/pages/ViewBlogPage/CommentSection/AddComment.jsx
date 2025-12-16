import { Field, Form, Formik,ErrorMessage } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { LiaTelegramPlane } from "react-icons/lia";
import * as yup from 'yup'
import clsx from 'clsx';
import { useSelector} from 'react-redux'
import { AuthSlicePath } from '../../../redux/slices/Auth.slice'
import { appwriteDatabase} from '../../../lib/appwrite';
import { ENVObj } from '../../../lib/constant';
import { ID } from 'appwrite';



const AddComment = ({isUpdate,setIsUpdate,id}) => {

  const authUser=useSelector(AuthSlicePath)

  const validationSchema=yup.object({
    msg:yup.string().required('Message is required')
  })
  
  const initialValues={
    msg:''
  } 

  const onSubmitHandler=async(values,helpers)=>{
    try{
      const item={
        user:authUser.name,
        msg:values.msg,
        blog:id
      }
      await appwriteDatabase.createDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_COMMENTS_COLLECTION_ID,ID.unique(),item)
      helpers.resetForm()
      toast.success("Comment Posted!")
      setIsUpdate(!isUpdate)
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
      <div hidden={!authUser} className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 relative'>
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
           {({errors})=>(
             <Form className='w-full relative'>
              <Field as='textarea' name="msg" id="msg" className='w-full py-4 px-2 rounded bg-section border outline-none placeholder:font-psemibold resize-none' placeholder='Leave your comments'/>
              <button disabled={!authUser} type='submit' className={clsx('text-2xl text-black bg-btn p-2 rounded-full absolute right-3 cursor-pointer',errors.msg?"bottom-10":"bottom-3")}>
                <LiaTelegramPlane/>
              </button>
              <ErrorMessage className='text-red-500' component={'p'} name='msg'/>
            </Form>
           )}
        </Formik>
      </div> 
    </>
  )
}

export default AddComment
