import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { TiCancel } from 'react-icons/ti';
import * as yup from 'yup';
import UploadImage from './components/UploadImage';
import MarkdownEditor from './components/MarkdownEditor';
import CustomLoaderButton from '../../components/CustomLoaderButton';
import { appwriteDatabase, appwriteStorage } from '../../lib/appwrite';
import { ENVObj, generateSlug } from '../../lib/constant';
import { ID } from 'appwrite';
import { useSelector } from 'react-redux';
import { AuthSlicePath } from '../../redux/slices/Auth.slice';
import { useMainContext } from '../../context/MainContext';

const NewBlogPage = () => {

  const [loading,setLoading]=useState(false)

  const authUser=useSelector(AuthSlicePath)

  const {fetchAllHomePageBlogs}=useMainContext()

  const initialValues={
    title:'',
    image:null,
    description:'',
    content:'',
    tags:''
  }

  const validationSchema=yup.object({
    title:yup.string().required("Title is required"),
    image:yup.mixed().required("Image is required"),
    description:yup.string().required("Description is required"),
    content:yup.string().required("Content is required"),
    tags:yup.string().required("Tags are required"),
  })

  const onSubmitHandler=async(values,helpers)=>{
    try {
      setLoading(true)
      //image upload
      const file=await appwriteStorage.createFile(ENVObj.VITE_APPWRITE_STORAGE_ID,ID.unique(),values.image)
      values['image']=file.$id
      values['slug']=generateSlug(values.title)
      values['user']=authUser.$id
      
      const blog=await appwriteDatabase.createDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,ID.unique(),values)
      toast.success("Blog Added")
      await fetchAllHomePageBlogs()
      helpers.resetForm()
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className="my-10 flex items-center justify-center min-h-[60vh]">
         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
           {({values,setFieldValue})=>(
            <Form className='w-full xl:w-[80%] bg-section py-10 px-3 rounded shadow'>
              <div className="div mb-3">
                <label htmlFor="title">Title</label>
                <Field name='title' type='text' className='w-full py-2 px-4 bg-main rounded border border-section outline-none' placeholder='Enter blog title' id='title' />
                <ErrorMessage name='title' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>
              </div>
              <div className="div mb-3">
                <label htmlFor="description">Description</label>
                <Field as='textarea' rows={5} name='description' className='w-full py-2 px-4 bg-main rounded border border-section outline-none resize-none' placeholder='Enter description' id='description' />
                <ErrorMessage name='description' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>
              </div>
              <div className="div mb-3">
                <label htmlFor="image">Image</label>
                <UploadImage value={values.image} setValue={(image)=>setFieldValue('image',image)} />
                <ErrorMessage name='image' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>
              </div>
              <div className="mb-3">
                <label htmlFor="content">Content</label>
                <MarkdownEditor value={values.content} setValue={(value)=>setFieldValue('content',value)} />
                <ErrorMessage name='content' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>  
              </div>
              <div className="div mb-7">
                <label htmlFor="tags">Tags</label>
                <Field type='text' name='tags' className='w-full py-2 px-4 bg-main rounded border border-section outline-none resize-none' placeholder='Enter tags (comma separated)' id='tags' />
                <ErrorMessage name='tags' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>
              </div>
              <CustomLoaderButton text={'Create Blog'} />
           </Form>
           )}
         </Formik>
      </div>
    </>
  )
}

export default NewBlogPage
