import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import ErrorPage from '../ErrorPage'
import LoaderComponent from '../../components/LoaderComponent'
import { appwriteDatabase, appwriteStorage } from '../../lib/appwrite'
import { ENVObj } from '../../lib/constant'
import { Query } from 'appwrite'
import MdPreviewComponent from './MdPreviewComponent'
import moment from 'moment'
import CommentSection from './CommentSection'

const ViewBlogPage = () => {

  const params=useParams()

  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(false)
  const [blog,setBlog]=useState(null)

  const fetchBlog=async()=>{
      try {
        setLoading(true)
        const blog=await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,[Query.equal('slug',params.slug),Query.equal('status',true)])
        const blogData=blog.documents[0]
        const {documents} = await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,[Query.equal('user',blogData.user),Query.select(['name','image'])])
               blogData['user']=documents[0]
               setBlog(blogData)
      
      } catch (error) {
        setError(true)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
      if(params.slug){
         fetchBlog()
      }
  },[])
  
  if(loading){
    return <LoaderComponent/>
  }

  if(error){
    return <ErrorPage/>
  }

  const image=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,blog.image)
   const profileImage=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,blog.user?.image)
  const tags=blog?.tags?.split(",")

  return (
    <section className='py-10 w-[96%] lg:w-[80%] mx-auto'>
       <div className=" w-full h-44 lg:h-150 mb-3 ">
         <img src={image} alt="" className='w-full h-full' />
       </div>
       <div className='mb-3 py-10'>
         <h1 className="text-start font-pblack text-3xl">{blog.title}</h1>
       </div>
        <div className='flex items-center gap-x-2 mb-8'>
        {profileImage && <img src={profileImage} alt={blog && blog.user.name} className='w-10 h-10 rounded-full' />}
        <div className='flex flex-col'>
            <p className='text-zinc-200 font-semibold text-lg' >{blog && blog.user.name}</p>
            <p className="text-sm text-zinc-300">{moment(blog.$createdAt).format("LL")}</p>
        </div>
      </div>
       <div className='mb-3'>
         <h1 className="text-lg font-pmedium text-start">{blog.description}</h1>
       </div>
       <div className='mb-3'>
         <MdPreviewComponent data={blog.content} />
       </div>
       <ul className="flex items-center gap-x-3 gap-y-3 flex-wrap mb-7">
        {tags && tags.map((cur,i)=>{return <li key={i} className='px-2 py-1 rounded-full bg-section border border-transparent hover:border-zinc-700 shadow-2xl transition-all'>#{cur}</li>})}
       </ul>
       <CommentSection id={blog.$id}/>
    </section>
  )
}

export default ViewBlogPage
