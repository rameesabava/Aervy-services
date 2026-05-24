import React, { useState } from 'react'
import {
  FaCheck,
  FaTimes,
  FaUserShield,
  FaEye
} from "react-icons/fa"

function AdminDashboard() {

  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "Rahul Service",
      email: "rahul@gmail.com",
      service: "Electrician",
      location: "Kochi",
      status: "pending"
    },
    {
      id: 2,
      name: "Akhil Plumbing",
      email: "akhil@gmail.com",
      service: "Plumber",
      location: "Edappally",
      status: "pending"
    },
    {
      id: 3,
      name: "Nithin Tutor",
      email: "nithin@gmail.com",
      service: "Tutor",
      location: "Kakkanad",
      status: "approved"
    }
  ])

  const updateStatus = (id, newStatus) => {
    const updated = providers.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    setProviders(updated)
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
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {
              providers.map((p) => (

                <tr key={p.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-semibold">{p.name}</td>
                  <td className="p-4">{p.email}</td>
                  <td className="p-4">{p.service}</td>
                  <td className="p-4">{p.location}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${p.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : p.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => alert(JSON.stringify(p))}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => updateStatus(p.id, "approved")}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => updateStatus(p.id, "rejected")}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AdminDashboard