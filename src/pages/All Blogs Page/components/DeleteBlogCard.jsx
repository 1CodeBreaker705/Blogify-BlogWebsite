import React from 'react'
import Swal from 'sweetalert2'
import { appwriteDatabase, appwriteStorage } from '../../../lib/appwrite';
import { ENVObj } from '../../../lib/constant';
import {useMainContext} from '../../../context/MainContext'

const DeleteBlogCard = ({data}) => {

  const {fetchAllUserBlogs,fetchAllHomePageBlogs}=useMainContext()

  const deleteBlogHandler=()=>{
      Swal.fire({
      theme: 'dark',
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fd366e",
      cancelButtonColor: "#52525b",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await appwriteStorage.deleteFile(ENVObj.VITE_APPWRITE_STORAGE_ID,data.image)
          await appwriteDatabase.deleteDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,data.$id)
          await fetchAllUserBlogs()
          await fetchAllHomePageBlogs()
        } catch (error) {
            Swal.fire({
            theme: 'dark',
            title: "Error!",
            confirmButtonColor:"#d33",
            text: error.message,
            icon: "error"
          });
          return
        }
        Swal.fire({
          theme: 'dark',
          title: "Deleted!",
          confirmButtonColor:"#fd366e",
          text: "Your blog has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <>
     <button onClick={deleteBlogHandler} className='px-3 py-2  mx-1 rounded bg-gray-300 text-black outline-none hover:bg-red-500 hover:text-white transition-all cursor-pointer'>Delete</button> 
    </>
  )
}

export default DeleteBlogCard
