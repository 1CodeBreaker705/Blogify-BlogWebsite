import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

export default function UploadImage({value,setValue}) {
  const onDrop = useCallback(acceptedFiles => {
    if(acceptedFiles.length>0){
      setValue(acceptedFiles[0])
    }
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept:{
      'image/*': ["*"],
    },
    multiple:false
  })

  return (
    <>
      {value && typeof value !== 'string'?
      <>
        <div className="w-full py-3">
          <div className="relative h-[50vh]">
             <img src={URL.createObjectURL(value)} alt="blog image"  className='h-full w-full object-contain'/>
             <button onClick={()=>setValue(null)} className='text-3xl bg-btn text-black rounded-full absolute right-0 top-0 cursor-pointer border-4 border-main hover:bg-btn-hover hover:scale-110 transition-all' >
              <IoMdClose/>
             </button>
          </div>
        </div>
      </>
      :
      <div {...getRootProps()} className='w-full my-3 py-10 border border-dashed border-btn flex flex-col items-center justify-center rounded text-sm lg:text-base cursor-pointer' >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <>
          <AiOutlineCloudUpload className='text-4xl lg:text-5xl text-btn'/>
          <p>Drop the files here ...</p>
          </> :
          <>
          <AiOutlineCloudUpload className='text-4xl lg:text-5xl text-btn'/>
          <p>Drag 'n' drop a file here, or click to select file</p>
          </>
      }
    </div>}
    </>
  )
}
