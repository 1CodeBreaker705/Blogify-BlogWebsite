import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { useMainContext } from '../context/MainContext';
import { FaPenAlt } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";

export default function CustomProfileButton() {

  const {logoutHandler}=useMainContext();

  return (
      <Menu>
        <MenuButton className='flex items-center justify-center gap-x-1 hover:text-btn-hover transition-all outline-none cursor-pointer'>
          <FaRegUserCircle className='text-3xl'/>
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-main transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <div className='my-1 h-px bg-white/5'></div>
          <MenuItem>
            <Link to={'/profile'} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-main/10 cursor-pointer">
              <FaRegUser className="size-4 fill-btn" />
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={'/new-blog'} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-main/10 cursor-pointer">
              <FaPenAlt className="size-4 fill-btn" />
               New Blog
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={'/all-blogs'} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-main/10 cursor-pointer">
              <MdOutlineArticle className="size-4 fill-btn" />
              All Blogs
            </Link>
          </MenuItem>
          <MenuItem>
            <button onClick={logoutHandler} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-main/10 cursor-pointer">
              <IoIosLogOut className="size-4 fill-btn" />
              Logout
            </button>
          </MenuItem>
          <div className='my-1 h-px bg-white/5'></div>
        </MenuItems>
      </Menu>
  )
}
