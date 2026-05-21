import React from 'react'
import { CiStar } from "react-icons/ci";

function About() {
  return (
    <div className='flex flex-col items-center justify-center p-5 text-center bg-gray-200'>
      <section className='flex items-center justify-center text-lg md:text-3xl'>
        {/* logo */}
        <img src="/icon.png" alt="icon" className='w-8' />
        <p className='text-amber-700'>AERVY SERVICES PLATFORM</p></section>

      {/* text content */}
      <p className='text-green-900 text-sm my-3'>KOCHI'S TRUSTED LOCAL SERVICE PLATFORM</p>
      <div className='font-semibold text-3xl text-center my-4'><p>From Fort Kochi to Kakkanad -</p><p>services that come to you.</p></div>
      <p>Aervy connects Kochi residents with verified local</p><p> professionals for home services, repairs, beauty, wellness, and</p><p> more — all bookable in minutes, right on your phone.</p>

      {/* status section */}
      <div className="grid md:grid-cols-4 mt-5 border border-gray-200 rounded-[30px] shadow-sm overflow-hidden">

        <div className="py-10 text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-5xl font-bold text-green-700">800+</h2>
          <p className="mt-3 text-gray-600 text-lg p-2">
            Verified professionals
          </p>
        </div>

        <div className="py-10 text-center border-b border-r border-gray-200">
          <h2 className="text-5xl font-bold text-green-700">15k+</h2>
          <p className="mt-3 text-gray-600 text-lg p-2">
            Happy customers
          </p>
        </div>

        <div className="py-10 text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-5xl font-bold text-green-700">12</h2>
          <p className="mt-3 text-gray-600 text-lg p-2">
            Areas covered
          </p>
        </div>
        <div className="py-10 text-center">
          <h2 className="text-5xl font-bold text-green-700 flex items-center justify-center gap-1">
            4.8
            <span className="text-2xl"><CiStar /></span>
          </h2>
          <p className="mt-3 text-gray-600 text-lg p-2">
            Avg. rating
          </p>
        </div>

      </div>
      
      
      <div>

      </div>

    </div>
  )
}

export default About