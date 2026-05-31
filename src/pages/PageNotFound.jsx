import React from 'react'
import { Link } from 'react-router-dom'


function PageNotFound() {

  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <img className='w-100' src="https://i.pinimg.com/originals/fa/e9/72/fae9722953261935d2c43b74c0881559.gif" alt="pnf" />
      <p>Oh No!</p>
      <h3 className='text-2xl font-medium'>Look Like You're Lost</h3>
      <p>The page you are looking for is not available</p>

<Link to={'/'} className='bg-black mt-5 px-3 py-2 text-white'>Home</Link>
    </div>
  )
}

export default PageNotFound