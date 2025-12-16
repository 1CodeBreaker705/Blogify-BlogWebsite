import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import { ImSpinner2 } from "react-icons/im";
import toast from 'react-hot-toast';
import { appwriteDatabase } from '../../../lib/appwrite';
import { ENVObj } from '../../../lib/constant';
import { Query } from 'appwrite';
const AllComments = ({isUpdate,id}) => {

  const [loading,setLoading]=useState(true)
  const [comments,setComments]=useState([])

  const fetchAllComments=async()=>{
    try {
      setLoading(true)
      const {documents}=await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_COMMENTS_COLLECTION_ID,[Query.equal('blog',id)])
      setComments(documents)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllComments()
  },[isUpdate])

  return (
    <>
      <h1 className='font-pbold text-4xl py-4'>Comments</h1>
      {loading?
      <>
        <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/3 py-10">
          <ImSpinner2 className='text-5xl animate-spin'/>
        </div>
      </>
        :
        <div className="flex flex-col gap-y-3">
          {
             comments.length>0?comments.map((curr,i)=>{
              return <CommentCard comment={curr} key={i}/>
            }):<h1 className='text-2xl font-pregular'>No comments yet!</h1>
          }
      </div>
      }
    </>
  )
}

export default AllComments

