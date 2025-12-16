import React from 'react'
import { Link } from 'react-router-dom'
import { appwriteStorage } from '../../../lib/appwrite'
import { ENVObj } from '../../../lib/constant'
import DeleteBlogCard from './DeleteBlogCard'
import moment from 'moment/moment'

const BlogCard = ({data}) => {

  const image=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,data.image)

  const tags=data?.tags?.split(",")

  return (
    <div className=' w-[96%] lg:w-[80%] mx-auto py-5 px-4 bg-section rounded shadow hover:shadow-2xl border border-transparent hover:border-btn hover:scale-[101%] transition-all duration-300 grid grid-cols-1 lg:grid-cols-4 gap-x-1'>
      <div className="col-span-1 overflow-hidden lg:h-44">
        <img src={image} alt="" className='w-full h-full rounded' />
      </div>
      <div className='col-span-3 py-2 lg:pl-5 flex flex-col gap-y-6 lg:gap-y-4'>
        <p className='text-2xl font-pbold capitalize'>{data.title?.substring(0,100)}{data.title?.length>100?'...':''}</p>
        <p>{data.description?.substring(0,100)}{data.description?.length>100?'...':''}</p>
        <p><span className={`px-4 py-2 rounded-full ${data.status?'bg-green-700':'bg-red-700'} text-white`}>Status: {data.status?"published":"unpublished"}</span></p>
        <p className="text-sm text-zinc-300 text-start">{moment(data.$createdAt).format('LL')}</p>
        <ul className="flex items-center justify-start gap-x-1 flex-wrap">
          {tags && tags.length>0 && tags.map((curr,i)=>{return <li className='px-3 py-1 rounded-full shadow bg-main capitalize'>{curr}</li>})}
        </ul>
        <div className="flex justify-end">
          <Link to={'/blog/update/'+ data.$id} className='px-3 py-2  mx-1 rounded bg-btn outline-none cursor-pointer hover:bg-btn-hover transition-all'>Edit</Link>
          <Link to={'/blog/'+ data.slug} className='px-3 py-2  mx-1 rounded bg-btn outline-none cursor-pointer hover:bg-btn-hover transition-all'>View</Link>
          <DeleteBlogCard data={data}/>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
