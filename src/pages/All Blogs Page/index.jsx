import React, { useEffect, useState } from 'react'
import BlogCard from './components/BlogCard'
import { GoSearch } from "react-icons/go";
import LoaderComponent from '../../components/LoaderComponent';
import NoBlogSection from './components/NoBlogSection';
import { useMainContext } from '../../context/MainContext';


const AllBlogsPage = () => {
  const [search,setSearch]=useState('')
  const {fetchAllUserBlogs,blogs}=useMainContext()
  const [loading,setLoading]=useState(false)

  const filterBlogs=(blogs.length>0)?blogs.filter((curr,i)=>{
     const x=curr?.title?.toLowerCase()
     const y=curr?.description?.toLowerCase()
     const z=search.toLowerCase()
     return  x.includes(z) || y.includes(z) 
  }):[]

  useEffect(()=>{
    const loadBlogs = async () => {
      setLoading(true)
      await fetchAllUserBlogs()
      setLoading(false)
    }
    loadBlogs()
  },[])

  if(loading){
    return <LoaderComponent/>
  }

  return (
    <>
     <div className="container mx-auto py-10">
        <div className="flex flex-col py-10 bg-black/10 w-full rounded gap-y-4">
          <div className="w-[96%] lg:w-[80%] mx-auto flex items-center justify-center">
            <div className="w-full lg:w-1/2 flex items-center justify-center border focus-within:bg-zinc-100 focus-within:border-pink-500/60 focus-within:shadow-md focus-within:shadow-pink-500/40 rounded-3xl px-4 bg-zinc-300 transition-all">
              <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                type="text"
                className="w-full py-3 bg-transparent text-black outline-none"
                placeholder='Search...'
              />
             <GoSearch className="text-xl text-black" />
            </div>
          </div>
          {
             (filterBlogs.length>0)?filterBlogs.map((curr,i)=>{return <BlogCard data={curr} key={i}/>}):<><NoBlogSection/></>
          }
        </div> 
     </div>
    </>
  )
}

export default AllBlogsPage
