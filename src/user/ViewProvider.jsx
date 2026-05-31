import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { bookingPaymentAPI, getApprovedProvidersAPI, getSingleProviderAPI } from "../services/allAPI"
import toast from "react-hot-toast"

function ViewProvider() {
    const { id } = useParams()
    const [provider, setProvider] = useState()

    useEffect(() => {
        getProvider(id)
    }, [id])

    const getProvider = async (id) => {
        const result = await getSingleProviderAPI(id)

        if (result.status == 200) {
            setProvider(result.data)
        }
    }

    if (!provider) {
        return <div className="p-10">Loading...</div>
    }

    const handlePayment = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"))

    const reqBody = {
        userId: user?._id,
        username: user?.username,
        providerId: provider?._id,
        providerName: provider?.username
        
    }

    const token = sessionStorage.getItem("token")

    const reqHeader = {
        Authorization: `Bearer ${token}`
    }

    const result = await bookingPaymentAPI(reqBody, reqHeader)

    if (result.status === 200) {

        window.location.href = result.data.checkoutURL

    } else {

        toast.error("Payment Failed")
    }
}

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-10 text-white">
                    <h1 className="text-4xl font-black">{provider.username}</h1>
                    <p className="text-lg mt-2">{provider.service}</p>
                </div>

                {/* Body */}
                <div className="p-8 space-y-4">

                    <p><b>Phone:</b> {provider.phone}</p>
                    <p><b>Location:</b> {provider.location}</p>
                    <p><b>Rate:</b> {provider.ratePerHour}/Hr</p>
                    <p><b>Description:</b> {provider.description}</p>

                    {/* Booking Button */}
                    <button onClick={handlePayment} className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-bold text-lg">
                        Book Now & Pay Advance
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ViewProvider