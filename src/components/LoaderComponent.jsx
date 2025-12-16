import React, { useEffect, useState } from 'react'

const LoaderComponent = () => {

  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    let interval=setInterval(() => {
      if(progress>100){
        return
      }
      setProgress(progress+1)
    },50);
    return ()=>{
        clearInterval(interval)
    }
  })

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'> 
        <div>
            <div className='font-pbold text-4xl flex items-center justify-center gap-x-2' >
              <span>Blogify</span>
              <span className='w-3 h-3 rounded-full bg-btn animate-bounce'></span>
            </div>
          <div className='overflow-hidden w-full bg-black/40 my-3 rounded-r-full'>
            <div style={{width:`${progress}%`}} className='bg-btn py-1 rounded-l-full rounded-r-full'></div>
          </div>
        </div> 
    </div>
  )
}

export default LoaderComponent
