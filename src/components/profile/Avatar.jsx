import { ID } from 'appwrite';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useMainContext } from '../../context/MainContext';
import { appwriteAccount, appwriteDatabase, appwriteStorage } from '../../lib/appwrite';
import { ENVObj } from '../../lib/constant';
import { AuthSlicePath } from '../../redux/slices/Auth.slice';

const Avatar = () => {
  const authUser=useSelector(AuthSlicePath)
  const [profileImage,setProfileImage]=useState('')  //for remote url for uploaded imagefile
  const [image,setImage]=useState(null)        //for new image file uploades
  const imageRef=useRef()

  const {fetchUser}=useMainContext()

  const imagePicker=()=>{ 
      if(imageRef.current){
        imageRef.current.value=null
      }        
      imageRef.current.click()
  }

  const fetchImage=()=>{
    try {
      if(!authUser?.profile?.image){
        return
      }
      const fileDB=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,authUser?.profile?.image)
      setProfileImage(fileDB)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
     fetchImage()
  },[authUser?.profile?.image])


  const uploadImage=async(e)=>{
     try {
       //upload image here
     if(e.target.files.length==0){
      return
     }
     setImage(e.target.files[0])
     const file=await appwriteStorage.createFile(ENVObj.VITE_APPWRITE_STORAGE_ID,ID.unique(),e.target.files[0])
     await appwriteDatabase.updateDocument(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,authUser.profile.$id,{
         image:file.$id
       })
       const fetchImage=appwriteStorage.getFileView(ENVObj.VITE_APPWRITE_STORAGE_ID,file.$id)
       if(fetchImage){
         await appwriteAccount.updatePrefs({
          avatarURL:fetchImage
         })
       }
     toast.success("Avatar Updated")
     await fetchUser()
     } catch (error) {
       toast.error(error.message)
    }
  }

  return (
    <>
       <div className="div flex items-center justify-center pt-10 pb-3">
        <div className='w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] rounded-full border-2 border-white p-2 relative'>
             <img className='w-full h-full rounded-full overflow-hidden hover:scale-110 transition-all' src={profileImage?profileImage:image?URL.createObjectURL(image):"/defaultAvatar.svg"} alt="" />
             <form>
              <input type="file" ref={imageRef} onChange={uploadImage} accept='image/*' className='hidden' />
              <button onClick={imagePicker} type='button' className='text-2xl lg:text-4xl absolute right-2 bottom-2 bg-btn text-section rounded-full p-1 ring-3 ring-main cursor-pointer hover:bg-btn-hover transition-all'><IoCameraOutline/></button>
            </form>
        </div>
       </div>
    </>
  )
}

export default Avatar
