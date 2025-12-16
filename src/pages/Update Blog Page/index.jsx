import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
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
import BackButton from '../../components/BackButton';
import LoaderComponent from '../../components/LoaderComponent'
import { useParams } from 'react-router-dom';
import { useMainContext } from '../../context/MainContext';

const UpdateBlogPage = () => {

  const [loading,setLoading]=useState(false)
  const [blog,setBlog]=useState({})
  const [loader,setLoader]=useState(true)
  const params=useParams()
  const authUser=useSelector(AuthSlicePath)
  const {fetchAllHomePageBlogs}=useMainContext()

  const fetchBlogData=async(id)=>{
     try {
       setLoader(true)
       const data=await appwriteDatabase.getDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,id)
       setBlog(data)
     } catch (error) {
      toast.error(error.message)
     }finally{
      setLoader(false)
     }
  }

  useEffect(()=>{
    if(params.id){
    fetchBlogData(params.id)
    }
  },[params])

  if(loader){
    return <LoaderComponent/>
  }

  const previewImage=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,blog.image)

  const initialValues={
    title:blog.title || '',
    image:null,
    description:blog.description || '',
    content:blog.content || '',
    tags:blog.tags || '',
    status:blog.status?blog.status:false
  }

  const validationSchema=yup.object({
    title:yup.string().required("Title is required"),
    //image:yup.mixed().required("Image is required"), //image is optional
    description:yup.string().required("Description is required"),
    content:yup.string().required("Content is required"),
    tags:yup.string().required("Tags are required"),
  })

  const onSubmitHandler=async(values,helpers)=>{
    try {
      setLoading(true)
      //file update
      if(values.image){
         await appwriteStorage.deleteFile(ENVObj.VITE_APPWRITE_STORAGE_ID,blog.image)
         const file=await appwriteStorage.createFile(ENVObj.VITE_APPWRITE_STORAGE_ID,ID.unique(),values.image)
         values['image']=file.$id
      }
      else{
        delete values['image']
      }
      values['slug']=generateSlug(values.title)
      values['user']=authUser.$id
      await appwriteDatabase.updateDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,blog.$id,values)
      toast.success("Blog Updated")
      await fetchBlogData(params.id)
      await fetchAllHomePageBlogs()
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center min-h-[60vh]">
         <div className=' w-[96%] xl:w-[80%] flex justify-start'>
           <BackButton/>
         </div>
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
                <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>
                  <div className='col-span-1 lg:px-10 lg:py-3'>
                    <img src={previewImage} alt="Blog image" />
                  </div>
                   <div className='col-span-1 lg:px-10'>
                      <UploadImage value={values.image} setValue={(image)=>setFieldValue('image',image)} />
                   </div>
                </div>
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
              <div className="div mb-4">
                <label htmlFor="tags">Tags</label>
                <Field type='text' name='tags' className='w-full py-2 px-4 bg-main rounded border border-section outline-none resize-none' placeholder='Enter tags (comma separated)' id='tags' />
                <ErrorMessage name='tags' render={(str)=>
                                <p className='text-rose-600 flex items-center justify-start gap-x-1'>
                                  <TiCancel/>
                                  <span>{str}</span>
                </p>}/>
              </div>
              <div className="mb-7">
                <div className='flex items-center gap-x-3'> 
                   <Field type='checkbox' name='status' id='status' className='w-8 h-8 accent-emerald-400 cursor-pointer transition-all' />
                   <label htmlFor="status">Status: publish ✔ / unpublish ☐</label>
                </div>
              </div>
              <CustomLoaderButton text={'Update Blog'} />
           </Form>
           )}
         </Formik>
      </div>
    </>
  )
}

export default UpdateBlogPage
