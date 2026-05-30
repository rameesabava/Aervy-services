import React, { useEffect, useState } from "react"
import { FaUserEdit, FaSave } from "react-icons/fa"
import { editProviderProfile, getProviderDetailsAPI } from "../services/allAPI"
import { useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"

function ProviderProfile() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)

  const [provider, setProvider] = useState({
    username: "",
  email: "",
  phone: "",
  location: "",
  service: "",
  ratePerHour: "",
  password: "",
  confirmPassword: "",
  description: ""
  })

  useEffect(()=>{
    getProviderDetails(id)
  },[id])

  const getProviderDetails = async (id)=>{
    const result = await getProviderDetailsAPI(id)
if (result?.status === 200) {
    setProvider(result.data)
  }  }

  const handleSave = async (id) => {
    const result = await editProviderProfile(id, provider)
    if (result.status == 200) {
      setProvider(result.data)
      toast.success("Profile updated succesfully!!!")
      navigate(`/provider/${id}`)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-black">
            {provider?.username}
          </h1>

          <p className="mt-2 text-white/90">
            Provider Profile
          </p>

          <button
            onClick={() => editMode ? handleSave(id) : setEditMode(true)}
            className="mt-6 flex items-center gap-2 bg-white text-amber-600 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            {editMode ? (
              <>
                <FaSave /> Save Changes
              </>
            ) : (
              <>
                <FaUserEdit /> Edit Profile
              </>
            )}
          </button>
        </div>



        {/* FORM GRID */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Full Name
            </label>

            <input type="text" name="username" value={provider?.username || ""} disabled={!editMode} onChange={e=>setProvider({...provider,username:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>

            <input type="email" name="email" value={provider?.email || ""} disabled={!editMode} onChange={e=>setProvider({...provider,email:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Phone
            </label>

            <input type="text" name="phone" value={provider?.phone || ""} disabled={!editMode} onChange={e=>setProvider({...provider,phone:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Location
            </label>

            <input type="text" name="location" value={provider?.location || ""} disabled={!editMode} onChange={e=>setProvider({...provider,location:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Service
            </label>

            <input type="text" name="service" value={provider?.service || ""} disabled={!editMode} onChange={e=>setProvider({...provider,service:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Rate Per Hour
            </label>

            <input type="text" name="ratePerHour" value={provider?.ratePerHour || ""} disabled={!editMode} onChange={e=>setProvider({...provider,ratePerHour:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          {/* PASSWORD */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>

            <input type="password" name="password" value={provider?.password || ""} disabled={!editMode} onChange={e=>setProvider({...provider,password:e.target.value})} className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="text-sm font-semibold text-gray-600">
              Confirm Password
            </label>

            <input type="password" name="password" value={provider?.confirmPassword || ""} disabled={!editMode} onChange={e=>setProvider({...provider,confirmPassword:e.target.value})} className="w-full mt-2 p-2 border rounded-lg" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-semibold text-gray-600">
            About Service
          </label>

          <textarea name="description" value={provider?.description || ""} disabled={!editMode} onChange={e=>setProvider({...provider,description:e.target.value})} rows="5" className="w-full mt-2 outline-none text-gray-800 disabled:bg-white resize-none" />
        </div>

      </div>
    </div>
  )
}

export default ProviderProfile