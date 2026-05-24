import React, { useState } from 'react'
import { FaUserEdit, FaCamera, FaSave } from "react-icons/fa";

function ProviderProfile() {

  const [editMode, setEditMode] = useState(false)

  const [provider, setProvider] = useState({
    fullName: "Rahul Service",
    email: "rahul@gmail.com",
    phone: "9876543210",
    location: "Kochi",
    service: "Electrician",
    description:
      "Experienced electrician providing home wiring and repair services.",
    profileImage: "https://as1.ftcdn.net/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  })

  // image upload
  const handleImageUpload = (e) => {

    const file = e.target.files[0]

    if (file) {

      const imageUrl = URL.createObjectURL(file)

      setProvider({
        ...provider,
        profileImage: imageUrl
      })
    }
  }

  const handleChange = (e) => {
    setProvider({
      ...provider,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setEditMode(false)
    alert("Profile Updated Successfully")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="w-full max-w-5xl bg-white rounded-[35px] shadow-2xl overflow-hidden">

        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 h-56 relative">

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-10">

            <div className="relative w-36 h-36">

              <img
                src={provider.profileImage}
                alt="profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
              />

              {/* Upload Button */}
              {
                editMode && (
                  <label className="absolute bottom-2 right-2 bg-black text-white p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all">

                    <FaCamera />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                  </label>
                )
              }

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="pt-24 px-10 pb-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

            <div>
              <h1 className="text-4xl font-black text-gray-800">
                {provider.fullName}
              </h1>

              <p className="text-gray-500 mt-2">
                Trusted Service Provider
              </p>
            </div>

            <button
              onClick={() =>
                editMode ? handleSave() : setEditMode(true)
              }
              className="flex items-center gap-3 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white px-6 py-3 rounded-2xl shadow-lg"
            >
              {
                editMode ?
                  <>
                    <FaSave />
                    Save Profile
                  </>
                  :
                  <>
                    <FaUserEdit />
                    Edit Profile
                  </>
              }
            </button>

          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={provider.fullName}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full mt-2 border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={provider.email}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full mt-2 border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={provider.phone}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full mt-2 border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={provider.location}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full mt-2 border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-8">

            <label className="font-semibold text-gray-700">
              About Service
            </label>

            <textarea
              rows="5"
              name="description"
              value={provider.description}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full mt-2 border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

export default ProviderProfile