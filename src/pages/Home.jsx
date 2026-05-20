import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from "gsap";

function Home() {

  
  return (
    <div style={{ backgroundImage: "url('/background.png')"}} className="h-screen flex flex-col justify-center items-center">
      <div className='mt-3 p-2 bg-white/5 text-amber-700 border rounded w-70 text-center md:w-150'>
        <p className='font-bold text-3xl'>AERVY SERVICES PLATFORM</p>
      </div>
      <div className='text-white text-2xl md:text-5xl p-3 font-bold text-center'>
        <p>Find trusted pros</p> <p>in <span className='text-amber-700'>Kochi</span>, instantly</p></div>
      <p className='text-gray-400'>Book electricians, plumbers, tutors and more - with real reviews and live chat. </p>
      <div className='mt-5 flex justify-center items-center'>
        <Link to={'/user'} className='bg-amber-950 text-white p-2 rounded-2xl me-2'>Find a Service</Link>
        <Link to={'/provider'} className='bg-amber-950 text-white p-2 rounded-2xl'>Join as Provider</Link>
      </div>
    </div>
  )
}

export default Home