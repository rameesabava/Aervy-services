import React from 'react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaLock
} from "react-icons/fa";
import { Link } from 'react-router-dom'

function Services() {

  // change this after login authentication
  const isLoggedIn = false

  const providers = [
    {
      id: 1,
      name: "Rahul Services",
      service: "Electrician",
      location: "Kochi",
      rating: 4.8,
      experience: "5 Years Experience"
    },

    {
      id: 2,
      name: "Akhil Plumbing",
      service: "Plumber",
      location: "Edappally",
      rating: 4.7,
      experience: "4 Years Experience"
    },

    {
      id: 3,
      name: "Nithin Tutor",
      service: "Home Tutor",
      location: "Kakkanad",
      rating: 4.9,
      experience: "6 Years Experience"
    },

    {
      id: 4,
      name: "Safe Cleaners",
      service: "Cleaner",
      location: "Aluva",
      rating: 4.6,
      experience: "3 Years Experience"
    },

    {
      id: 5,
      name: "Anu Beautician",
      service: "Beautician",
      location: "Fort Kochi",
      rating: 4.9,
      experience: "7 Years Experience"
    }
  ]

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
          Register to view provider details and book services
        </p>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

        {
          providers.map((provider) => (

            <div
              key={provider.id}
              className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >

              {/* Top */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-8 text-white">

                <h2 className="text-3xl font-black">
                  {provider.name}
                </h2>

                <p className="mt-2 text-lg">
                  {provider.service}
                </p>

              </div>

              {/* Content */}
              <div className="p-6">

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">

                  <FaStar className="text-yellow-500" />

                  <span className="font-semibold">
                    {provider.rating}
                  </span>

                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-gray-600 mb-4">

                  <FaMapMarkerAlt className="text-amber-500" />

                  <span>{provider.location}</span>

                </div>

                
                {/* Login Restriction */}
                {
                  !isLoggedIn ? (

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">

                      <FaLock className="mx-auto text-amber-500 text-3xl mb-3" />

                      <p className="text-gray-700 font-medium">
                        Register or login to view provider details and book services
                      </p>

                      <div className="flex gap-3 mt-5">

                        <Link
                          to="/register"
                          className="flex-1 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white py-3 rounded-2xl font-semibold"
                        >
                          Register
                        </Link>

                        <Link
                          to="/login"
                          className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 py-3 rounded-2xl font-semibold"
                        >
                          Login
                        </Link>

                      </div>

                    </div>

                  ) : (

                    <div>

                      {/* Visible only after login */}
                      <div className="space-y-3 mb-6">

                        <p className="text-gray-700">
                          <span className="font-bold">
                            Phone:
                          </span> 9876543210
                        </p>

                        <p className="text-gray-700">
                          <span className="font-bold">
                            Availability:
                          </span> Available Today
                        </p>

                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4">

                        <button className="flex-1 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white py-3 rounded-2xl font-semibold">
                          Book Now
                        </button>

                        <button className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 py-3 rounded-2xl font-semibold">
                          Message
                        </button>

                      </div>

                    </div>

                  )
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Services