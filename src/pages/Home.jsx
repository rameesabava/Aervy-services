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
      <div className="flex gap-4 flex-wrap mt-3">
              <Link to={'/user'} className="bg-white border-amber-700 text-amber-700 px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:bg-amber-700 hover:text-white hover:border-white transition-all shadow-xl">
                Find Services
              </Link>

              <Link to={'/provider'} className="border bg-amber-700 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:text-amber-700 hover:scale-105 hover:bg-white transition-all">
                Join as Provider
              </Link>
            </div>
    </div>
  )
}

export default Home