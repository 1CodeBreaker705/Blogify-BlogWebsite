import React, { useState } from 'react'
import HomeBlogCard from './HomeBlogCard'
import { useMainContext } from '../../context/MainContext'
import { GoSearch } from "react-icons/go";

const HomePage = () => {
  const [search,setSearch]=useState('')
  const {allHomePageBlogs}=useMainContext();

  const filterBlogs=allHomePageBlogs.length>0?allHomePageBlogs.filter((curr,i)=>{
       if(!search){
        return true
       }
       const x=curr.title?.toLowerCase()
       const y=curr.description?.toLowerCase()
       const z=curr.tags?.toLowerCase()
       const alpha=search.toLowerCase()
       return x.includes(alpha) || y.includes(alpha) || z.includes(alpha)
  }):[]

  return (
    <>
         <div className='w-[96%] lg:w-[80%] mx-auto flex items-center justify-center my-6' >
                      <div className=" w-full lg:w-1/2 flex items-center justify-center border focus-within:bg-zinc-100 focus-within:border-pink-500/60 focus-within:shadow-md focus-within:shadow-pink-500/40 rounded-3xl px-4 bg-zinc-300 transition-all">
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
      <div className=" w-[96%] lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 auto-rows-fr">
           {
            (filterBlogs && filterBlogs.length>0)?
            filterBlogs.map((curr,i)=>{return <HomeBlogCard data={curr} key={i}/>})
            :
            <>
            <div className='py-10 col-span-1 lg:col-span-2 xl:col-span-3 text-center'>
              <h1 className='text-4xl '>Nothing here yet<span className='text-btn' >!</span> — try searching or check back soon.</h1>
            </div>
            </>
           }
      </div>
    </>
  )
}

export default HomePage
