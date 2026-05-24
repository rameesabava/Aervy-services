import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
  FaTools
} from "react-icons/fa"

function UserHome() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  const user = JSON.parse(localStorage.getItem("user"))

  const categories = [
    { name: "Electrician", icon: "⚡" },
    { name: "Plumber", icon: "🚰" },
    { name: "Cleaner", icon: "🧹" },
    { name: "Tutor", icon: "📚" },
    { name: "Beautician", icon: "💄" },
    { name: "Driver", icon: "🚗" }
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-black text-amber-600">
          AERVY
        </h1>

        <div className="flex items-center gap-4">

          <FaUserCircle className="text-2xl text-gray-600" />

          <span className="font-semibold text-gray-700">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* Hero */}
      <div className="text-center py-16 px-4">

        <h1 className="text-5xl font-black text-gray-800">
          Find Trusted Services Near You
        </h1>

        <p className="text-gray-500 mt-4">
          Book electricians, plumbers, tutors and more instantly
        </p>

        {/* Search */}
        <div className="mt-8 flex justify-center">

          <div className="flex items-center bg-white shadow-lg rounded-2xl px-5 py-3 w-full max-w-xl">

            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search services..."
              className="w-full ml-3 outline-none"
            />

          </div>

        </div>

      </div>

      {/* Categories */}
      <div className="px-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {
            categories.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow hover:scale-105 transition-all cursor-pointer text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="font-semibold">{item.name}</p>
              </div>
            ))
          }

        </div>

      </div>

      {/* CTA */}
      <div className="mt-16 text-center pb-16">

        <Link
          to="/services"
          className="bg-amber-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all"
        >
          Browse All Providers
        </Link>

      </div>

    </div>
  )
}

export default UserHome