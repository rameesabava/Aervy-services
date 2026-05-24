import React from 'react'
import { FaUserCircle, FaClipboardList, FaComments, FaSignOutAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';

function ProviderDashboard() {
  
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-black text-white p-6 hidden md:block">

        <h1 className="text-3xl font-black text-amber-500 mb-10">AERVY</h1>

        <div className="space-y-6">

          <Link to={'/profile/id'} className="flex items-center gap-4 hover:text-amber-500 ">
            <FaUserCircle />
            <span>Profile</span>
          </Link>

          <button className="flex items-center gap-4 hover:text-amber-500 ">
            <FaClipboardList />
            <span>Bookings</span>
          </button>

                              <Link to={'/messages'} className="flex items-center gap-4 hover:text-amber-500 ">
            <FaComments />
            <span>Messages</span>
          </Link>

          <button className="flex items-center gap-4 hover:text-red-500  mt-20">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 rounded-3xl p-8 text-white shadow-xl">

          <h2 className="text-4xl font-black">
            Welcome, Rahul
          </h2>

          <p className="mt-2 text-lg">
            Manage your services and bookings easily.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Service</h3>
            <p className="text-3xl font-bold mt-2">
              Electrician
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Bookings</h3>
            <p className="text-3xl font-bold mt-2">
              24
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Earnings</h3>
            <p className="text-3xl font-bold mt-2">
              12500
            </p>
          </div>

        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Recent Bookings
            </h2>

            <button className="bg-amber-500 text-white px-5 py-2 rounded-xl hover:bg-amber-600">
              View All
            </button>
          </div>

          <div className="space-y-4">

            <div className="border rounded-2xl p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">Electrical Wiring</h3>
                <p className="text-gray-500">Customer: Arjun</p>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                Completed
              </span>
            </div>

                  </div>

        </div>

      </div>

    </div>
  )
}

export default ProviderDashboard