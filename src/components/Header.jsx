import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

function Header() {
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
      <div className="hidden md:flex items-center bg-gray-100 hover:bg-gray-200 transition rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-amber-400">
        <input
          type="text"
          placeholder="Search services..."
          className="bg-transparent outline-none px-2 text-sm w-40 md:w-64"
        />
        <button className="text-gray-600 hover:text-amber-700 transition">
          <FaSearch />
        </button>
      </div>
      <Link to={'/login'} className='bg-amber-800 text-white p-1 rounded me-2 text-sm'>Login</Link>

    </div>
  )
}

export default Header