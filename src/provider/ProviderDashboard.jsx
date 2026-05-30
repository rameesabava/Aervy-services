import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaClipboardList, FaComments, FaSignOutAlt} from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { getProviderBookingsAPI, getProviderDetailsAPI } from '../services/allAPI';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";

function ProviderDashboard() {
  const {id} = useParams()
  const [provider, setProvider]  =useState({username: "", email: "", password: "", phone: "", location: "", service: "", description: "", ratePerHour: ""})
  const [bookings, setBookings] = useState([])



    const getProvider = async (id) => {
        const result = await getProviderDetailsAPI(id)

        if (result.status == 200) {
            setProvider(result.data)
        }
    }

    

  const getbookings = async(id)=>{
    const result = await getProviderBookingsAPI(id)
    setBookings(result.data)
  }

  useEffect(() => {
  if(id){
    getProvider(id)
        getbookings(id)

  }
        
    }, [id])
  if (!provider) {
        return <div className="p-10">Loading...</div>
    }

    // for pie chart completed and pending bookings
    const completedBookings = bookings.filter(
  item => item.status === "Completed"
).length

const pendingBookings = bookings.filter(
  item => item.status == "Pending"
).length

const chartData = [
  {
    name: "Completed",
    value: completedBookings
  },
  {
    name: "Pending",
    value: pendingBookings
  }
]

const COLORS = ["#22c55e", "#f59e0b"]
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-black text-white p-6 hidden md:block">

        <h1 className="text-3xl font-black text-amber-500 mb-10">AERVY</h1>

        <div className="space-y-6">

          <Link to={`/provider-profile/${id}`} className="flex items-center gap-4 hover:text-amber-500 ">
            <FaUserCircle />
            <span>Profile</span>
          </Link>

          <Link to={`/provider/bookings/${id}`} className="flex items-center gap-4 hover:text-amber-500 ">
            <FaClipboardList />
            <span>Bookings</span>
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
            Welcome, {provider?.username}
          </h2>

          <p className="mt-2 text-lg">
            Manage your services and bookings easily.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Service</h3>
            <p className="text-3xl font-bold mt-2">
              {provider?.service}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-gray-500">Bookings</h3>
            <p className="text-3xl font-bold mt-2">
              {bookings?.length}
            </p>
          </div>

          
        </div>

        {/* pie chart */}
<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

  <h2 className="text-2xl font-bold mb-6">
    Booking Analytics
  </h2>

  <div className="w-full h-[350px]">

    <ResponsiveContainer>

      <PieChart>

        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >

          {
            chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))
          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>
        

      </div>

    </div>
  )
}

export default ProviderDashboard