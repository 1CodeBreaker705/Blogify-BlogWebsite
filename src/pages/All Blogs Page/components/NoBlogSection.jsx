import React from 'react'
import { Link } from 'react-router-dom'

const NoBlogSection = () => {
  return (
    <>
      <div className="my-4 w-[96%] lg:w-[80%] mx-auto flex flex-col justify-center items-center">
        <div className="py-10 bg-[#111113] flex items-center justify-center gap-x-3 ">
          <img src="/noSearchResults.png" alt="" className='w-[150px] h-[150px]' />
          <span className='text-2xl font-bold'>Couldn’t find any blogs.</span>
        </div>
        <Link to={'/new-blog'} className='px-4 py-2 bg-btn rounded hover:bg-btn-hover transition-all' >New Blog</Link>
      </div>
    </>
  )
}

export default NoBlogSection
