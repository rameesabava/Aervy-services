import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProviderBookingsAPI, updateProviderBookingCompleteAPI, updateProviderBookingRejectAPI } from '../services/allAPI'
function ProviderBookings() {
  const { id } = useParams()
  const [bookingDetails, setBookingDetails] = useState([])

  useEffect(() => {
  if (id) {
    getBookings(id)
  }
}, [id])

  const getBookings = async (id) => {
    const result = await getProviderBookingsAPI(id)
    setBookingDetails(result.data)
  }

  const handleComplete = async (bookingId) => {
  const result = await updateProviderBookingCompleteAPI({ id: bookingId })

  if (result.status === 200) {
    getBookings(id) // provider id from useParams
  }
}

const handleReject = async (bookingId) => {
  const result = await updateProviderBookingRejectAPI({ id: bookingId })

  if (result.status === 200) {
    getBookings(id)
  }
}

  return (
    <div>
      {/* Bookings */}
      <div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

        <div className="flex justify-center items-center mb-6 bg-amber-600 rounded p-3">
          <h2 className="text-2xl font-bold">
            Bookings
          </h2>


        </div>

        {
  bookingDetails.length > 0 ?
    bookingDetails.map((booking) => (
      <div key={booking._id} className="space-y-4 mb-3">

        <div className="border rounded-2xl p-4 flex justify-between items-center">

          <div>
            <p className="text-gray-500">
              Customer: {booking?.username}
            </p>
          </div>

         <div className="flex items-center gap-3">

  <span
    className={`px-4 py-2 rounded-xl font-medium
      ${
        booking?.status === "Completed"
          ? "bg-green-100 text-green-700"
          : booking?.status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }
    `}
  >
    {booking?.status}
  </span>

  {booking?.status === "Pending" && (
    <>
      <button
        onClick={() => handleComplete(booking?._id)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
      >
        Complete
      </button>

      <button
        onClick={() => handleReject(booking?._id)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
      >
        Reject
      </button>
    </>
  )}

</div>

        </div>

      </div>
    ))
    :
    <p className='text-center font-bold text-xl'>
      No Bookings found
    </p>
}

      </div>
    </div>
  )
}

export default ProviderBookings