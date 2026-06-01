import React, { useEffect, useState } from 'react'
import { getUserBookingsAPI } from '../services/allAPI'
import { useParams } from 'react-router-dom'

function UserBookings() {

    const [bookings, setBookings] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = async () => {

        const result = await getUserBookingsAPI(id)
console.log(result);

        if (result.status == 200) {
            setBookings(result.data)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    My Bookings
                </h2>

                {
                    bookings.length > 0 ?

                        bookings.map((booking) => (

                            <div key={booking?._id} className="border rounded-2xl p-4 mb-4 flex justify-between items-center">

                                <div>
                                    <p>
                                        <b>Provider:</b> {booking?.providerName}
                                    </p>

                                    <p>
                                        <b>Status:</b> {booking?.status}
                                    </p>
                                </div>

                                <span
                                    className={`px-4 py-2 rounded-xl
                                    ${
                                        booking?.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : booking.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {booking?.status}
                                </span>

                            </div>
                        ))

                        :

                        <p className="text-center text-xl font-semibold">
                            No Bookings Found
                        </p>
                }

            </div>

        </div>
    )
}

export default UserBookings