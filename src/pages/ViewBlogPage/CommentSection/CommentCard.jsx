import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { appwriteDatabase } from '../../../lib/appwrite';
import { ENVObj } from '../../../lib/constant';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';

const CommentCard = ({comment}) => {

  return (
    <div className='w-full py-4 px-3 rounded shadow flex items-start gap-3 bg-black/20 md:w-1/2 lg:w-1/3'>
      
      <FaRegUserCircle className='text-5xl flex-shrink-0 text-zinc-400' />
      
      <div className='flex flex-col flex-1 min-w-0'>
        {/* Username */}
        <div className='flex items-center justify-between flex-wrap'>
          <span className='px-3 py-1 rounded-full font-pmedium bg-black/40 text-sm text-white'>
            @{comment?.user ?? 'user'}
          </span>
          <p className='text-xs text-zinc-400'>
            {moment(comment.$createdAt).format("LL")}
          </p>
        </div>

        {/* Comment text */}
        <p className='mt-3 px-1 text-zinc-200 break-words whitespace-pre-wrap leading-relaxed'>
          {comment.msg}
        </p>
      </div>

    </div>
  )
}

export default CommentCard
