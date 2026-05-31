import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import toast from 'react-hot-toast';
import { searchContext } from '../context API/ShareContext';

function Header() {
  const navigate = useNavigate()
  const { searchKey, setSearchKey } = useContext(searchContext)
  
  const token = sessionStorage.getItem("token")

  const user = JSON.parse(sessionStorage.getItem("user"))

  const role = user?.role

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    toast.success("Logged out successfully!!!")
    setTimeout(()=>{
      navigate('/login')
    },2000)
  }

  const handleSearch = () => {
      if (!searchKey) {
        toast.error("Please input service!!!")
      } else if (!sessionStorage.getItem("token")) {
        toast.error("Please Login!!!")
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } else if (searchKey && sessionStorage.getItem("token")) {
        navigate("/services")
      } else {
        toast.error("Something went wrong!!!")
      }
    }

  return (
    <div className='flex justify-between items-center px-3 py-2 sticky top-0 z-50 backdrop-blur-md bg-white/70  text-sm md:text-lg'>

      {/* logo */}
      <div className='font-semibold text-amber-700 flex items-center'>
        <img src="/icon.png" alt="icon" className='w-10 me-2' />
        <p className='hidden md:block'>AERVY SERVICES PLATFORM</p>
      </div>

      <div className='flex justify-center'>
        {/* links */}
        <Link to={'/'} className='me-3 hover:text-amber-700 outline-none focus:outline-none'>Home</Link>
        <Link to={'/about'} className='me-3 hover:text-amber-700 outline-none focus:outline-none'>About</Link>
        <Link to={'/contact'} className='hover:text-amber-700 outline-none focus:outline-none'>Contact</Link>
      </div>

      {/* search */}
     {
     role=="user" && <div className="hidden md:flex items-center bg-gray-100 hover:bg-gray-200 transition rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-amber-400">
        <input onChange={(e)=>setSearchKey(e.target.value)} value={searchKey} type="text" placeholder="Search services..." className="bg-transparent outline-none px-2 text-sm w-40 md:w-64" />
        <button onClick={handleSearch} className="text-gray-600 hover:text-amber-700 transition">
          <FaSearch />
        </button>
      </div>}

{ !token? 
     <Link to={'/login'} className='bg-amber-800 text-white px-3 py-1 rounded text-sm'>Login</Link>
     :
     <button onClick={handleLogout} className='bg-amber-800 text-white px-3 py-1 rounded text-sm'>Logout</button>
}
    </div>
  )
}

export default Header