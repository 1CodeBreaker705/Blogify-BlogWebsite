import React, { createContext, useContext, useEffect, useState } from 'react'
import LoaderComponent from '../components/LoaderComponent'
import { appwriteAccount, appwriteDatabase } from '../lib/appwrite'
import { useDispatch, useSelector} from 'react-redux'
import { AuthSlicePath, removeUser, setUser } from '../redux/slices/Auth.slice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ENVObj } from '../lib/constant'
import { ID, Query } from 'appwrite'

export const MainContext=createContext()

export const useMainContext=()=>useContext(MainContext)

export const MainContextProvider = ({children}) => {

  const [authLoading,setAuthLoading]=useState(true)
  
  const dispatch=useDispatch()

  const navigate=useNavigate();

  const [checkedOnce,setCheckedOnce]=useState(false)

  const [blogs,setBlogs]=useState([])
 
  const authUser=useSelector(AuthSlicePath)

  const [allHomePageBlogs,setAllHomePageBlogs]=useState([])


  const fetchUser=async()=>{
    try {
      if(!checkedOnce){
        setAuthLoading(true)
      }
      const user=await appwriteAccount.get()
      const profileDocs = await appwriteDatabase.listDocuments(
      ENVObj.VITE_APPWRITE_DB_ID,
      ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,
      [Query.equal('user', user.$id)]
      );
      let profile;
      if (profileDocs.total === 0) {
      //  Create if missing (for new signups or imported users)
        profile = await appwriteDatabase.createDocument(
        ENVObj.VITE_APPWRITE_DB_ID,
        ENVObj.VITE_APPWRITE_PROFILE_COLLECTION_ID,
        ID.unique(),
        {
          user: user.$id,
          name: user.name || '',
          bio: '',
          image: '',
        }
      );
    } else {
      profile = profileDocs.documents[0];
    }
      // Merge both account + profile
      const fullUser = { ...user, profile };
      dispatch(setUser(fullUser))
    } catch (error) {
      dispatch(removeUser())
      setBlogs([])
    }finally{
      setAuthLoading(false)
      setCheckedOnce(true)
    }
  }

  const logoutHandler=async()=>{
    try {
      await appwriteAccount.deleteSession('current')
      dispatch(removeUser())
      setBlogs([])
      navigate('/')
      toast.success('Logged Out')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchAllHomePageBlogs=async()=>{
       try {
        const data=await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,[Query.equal('status',true),Query.select(['title','description','image','slug','status','tags','user'])])
        setAllHomePageBlogs(data.documents)
      } catch (error) {
        toast.error(error.message)
      }
  }

  const fetchAllUserBlogs=async()=>{ 
    try {
        const data=await appwriteDatabase.listDocuments(ENVObj.VITE_APPWRITE_DB_ID,ENVObj.VITE_APPWRITE_BLOGS_COLLECTION_ID,[Query.equal('user',authUser.$id),Query.select(['title','description','image','slug','status','tags'])])
        setBlogs(data.documents)
      } catch (error) {
        toast.error(error.message)
      }
    }
  
  // Run once on mount
  useEffect(()=>{
    fetchUser()
    fetchAllHomePageBlogs()
  },[])

   
  if(authLoading && !checkedOnce){
    return <LoaderComponent/>
  }

  return (
    <MainContext.Provider value={{logoutHandler,fetchUser,fetchAllUserBlogs,blogs,allHomePageBlogs,fetchAllHomePageBlogs}}>
      {children}
    </MainContext.Provider>
  )
}




