import React, { useContext, useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { getApprovedProvidersAPI } from '../services/allAPI';
import toast from "react-hot-toast";
import { searchContext } from '../context API/ShareContext';

function Services() {
const navigate = useNavigate()
const {searchKey} = useContext(searchContext)
  const [approvedProviders, setApprovedProviders] = useState([])
  
  
  const token = sessionStorage.getItem("token")
  console.log(token);
  
useEffect(() => {
    getApprovedProviders()
  }, [])

  const filteredProviders = searchKey?.trim()? approvedProviders.filter((item) =>
      item.service.toLowerCase().includes(searchKey.toLowerCase())
    )
  : approvedProviders;
  
  const getApprovedProviders = async () => {
    const result = await getApprovedProvidersAPI()
    if (result.status == 200) {
      // console.log(result.data);

      setApprovedProviders(result.data)
    }
  }

 
 


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Heading */}
      <div className="text-center">

        <p className="text-amber-500 font-bold text-xl">
          AERVY SERVICES
        </p>

        <h1 className="text-5xl font-black text-gray-800 mt-3">
          Trusted Service Providers
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Register or Login to view provider details and book services
        </p>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

        {filteredProviders.length>0?

          filteredProviders.map((provider) => (

            <div
              key={provider?._id}
              className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >

              {/* Top */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-8 text-white">

                <h2 className="text-3xl font-black">
                  {provider?.username}
                </h2>

                <p className="mt-2 text-lg">
                  {provider?.service}
                </p>

              </div>

              {/* Content */}
              <div className="p-6">

               
                {/* Location */}
                <div className="flex items-center gap-3 text-gray-600 mb-4">

                  <FaMapMarkerAlt className="text-amber-500" />

                  <span>{provider?.location}</span>

                </div>
                <div className="space-y-3 mb-6">

                        <p className="text-gray-700">
                          <span className="font-bold">
                            Rate:
                          </span> {provider?.ratePerHour}/Hr
                        </p>

                       
                      </div>


                {/* Login Restriction */}
                {
                  !token ? (

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">

                      <FaLock className="mx-auto text-amber-500 text-3xl mb-3" />

                      <p className="text-gray-700 font-medium">
                        Register or login to view provider details and book services
                      </p>

                      <div className="flex gap-3 mt-5">

                        <Link to="/register" className="flex-1 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white py-3 rounded-2xl font-semibold" >
                          Register
                        </Link>

                        <Link to="/login" className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 py-3 rounded-2xl font-semibold">
                          Login
                        </Link>

                      </div>

                    </div>

                  ) : (

                    <div>

                      {/* Visible only after login */}
                      

                      {/* Buttons */}
                      <div className="flex gap-4">

                       

                        <Link
  to={`/provider/view/${provider?._id}`}
  className="flex-1 flex items-center justify-center border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 py-3 rounded-2xl font-semibold"
>
  View Details
</Link>

                      </div>

                    </div>

                  )
                }

              </div>

            </div>

          ))
          :
          <p className='font-bold m-3 text-2xl'>Loading...</p>
        }

      </div>

    </div>
  )
}

export default Services