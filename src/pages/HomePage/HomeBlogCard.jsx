import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { appwriteDatabase, appwriteStorage } from '../../lib/appwrite';
import { ENVObj } from '../../lib/constant';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Query } from 'appwrite';
const HomeBlogCard = ({data}) => {

  const DEFAULT_AVATAR = '/defaultAvatar.svg'

  const [user,setUser]=useState({})
  const [images,setImages]=useState({
    image:'',
    profileImage:''
  })

  const tags=data?.tags?.split(",")

  const fetchUserDetail=async()=>{
     try {
       const {documents} = await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,[Query.equal('user',data.user),Query.select(['name','image'])])
       setUser(documents[0])
            const profileImage = documents[0].image === 'defaultAvatar.svg' || !documents[0].image? DEFAULT_AVATAR: appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID, documents[0].image)
        const image=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,data.image)
        setImages({image,profileImage})
     } catch (error) {
       toast.error(error.message)
     }
  }

  useEffect(()=>{
    fetchUserDetail()
  },[])

  
  
  return (
    <>

<Link to={`/blog/${data.slug}`} className='lg:p-4 my-1'>
  <div className="bg-section border-zinc-800  border hover:border-pink-500/40  hover:scale-[101%] transition-all duration-300 w-full p-3 rounded-lg shadow-md shadow-black flex flex-col h-[500px] lg:h-full">
      <div className='h-40 lg:h-56 overflow-hidden'>
        <img className=" w-full h-full rounded-md hover:scale-105 transition-all duration-300 " src={images.image} alt='' />
      </div>
        <h5 className="mt-6 mb-2 text-xl lg:text-2xl font-psemibold tracking-tight text-heading">{data.title?.substring(0,100)}{data.title?.length>100?'...':''}</h5>
        <p className="mb-4 text-zinc-300 leading-normal font-pregular">{data.description?.substring(0,100)}{data.description?.length>100?'...':''}</p>
        <ul className="flex items-center justify-start gap-x-2 flex-wrap mb-4">
            {tags && tags.length > 0 && tags.slice(0, 4).map((curr, i) => (
              <li key={i} className='px-2 py-1 text-xs rounded-full shadow bg-main capitalize'>
                {curr}
              </li>
            ))}
            {tags.length > 4 && (
              <li className='px-2 py-1 my-1 text-xs rounded-full shadow bg-main'>+{tags.length - 4} more</li>
            )}
        </ul>
        <div className='flex items-center gap-x-2 mt-auto'>
          {images.profileImage && <img src={images.profileImage} alt={user.name} className='w-10 h-10 rounded-full '  onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} />}
          <div className='flex flex-col'>
            <p className='text-zinc-200 font-semibold' >{user.name}</p>
            <p className="text-end text-xs text-zinc-300">{moment(data.$createdAt).format("LL")}</p>
          </div>
      </div>
  </div>
</Link>


    </>
  )
}

export default HomeBlogCard
