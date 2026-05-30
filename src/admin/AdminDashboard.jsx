import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes, FaUserShield, FaEye } from "react-icons/fa"
import { approveProvidersAPI, pendingProvidersAPI, rejectProvidersAPI } from '../services/allAPI'
import toast from "react-hot-toast";

function AdminDashboard() {

  const [providers, setProviders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  useEffect(() => {
    getPendingProviders()
  }, [])

  const getPendingProviders = async () => {
    const result = await pendingProvidersAPI()
    if (result.status == 200) {
      setProviders(result.data)
    }
  }

  const handleApprove = async (id)=>{
    const result = await approveProvidersAPI(id)
    if(result.status==200){
      toast.success("Provider approved successfully!!!")
      getPendingProviders()
    }
  }

 const handleReject = async (id)=>{
    const result = await rejectProvidersAPI(id)
    if(result.status==200){
      toast.error("Provider rejected!!!")
      getPendingProviders()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <FaUserShield className="text-3xl text-amber-500" />
          <h1 className="text-3xl font-black text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        <p className="text-gray-500">
          Manage provider registrations
        </p>

      </div>

      {/* Table */}
      <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {providers?.length > 0 ?
              providers?.map((provider) => (

                <tr key={provider?._id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-semibold">{provider?.username}</td>
                  <td className="p-4">{provider?.email}</td>
                  <td className="p-4">{provider?.service}</td>
                  <td className="p-4">{provider?.location}</td>
                  <td className="p-4">
                    <button onClick={() => {
                      setSelectedImage(provider?.identityCard)
                      setShowModal(true)
                    }}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td className="p-4">{provider?.status}</td>

                  {/* Actions */}
                  <td className="p-4">

                    <div className="flex justify-center gap-3">



                      <button onClick={()=>handleApprove(provider?._id)} className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
                        <FaCheck />
                      </button>

                      <button  onClick={()=>handleReject(provider?._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </td>

                </tr>

              ))
              :
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <p className='m-3 font-bold text-xl'>Loading.....</p></tr>
            }

          </tbody>

        </table>

      </div>
      {
        showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-4 relative w-[90%] max-w-lg">

              {/* Close Button */}
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg">X</button>

              {/* ID Card Image */}
              <img
                src={`${import.meta.env.VITE_BASEURL}/uploads/${selectedImage}`}
                alt="ID Card"
                className="w-full h-[500px] object-contain rounded-xl"
              />

            </div>

          </div>
        )
      }

    </div>
  )
}

export default AdminDashboard