import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [role, setRole] = useState("user") // user | provider

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      alert("Please fill all fields")
      return
    }

    // fake login (replace with backend later)
    const userData = {
      email: form.email,
      role: role,
      token: "demo-token"
    }

    localStorage.setItem("user", JSON.stringify(userData))

    alert(`${role} login successful`)

    // redirect based on role
    if (role === "provider") {
      navigate("/provider-dashboard")
    } else {
      navigate("/services")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8">

        <h1 className="text-3xl font-black text-center text-gray-800">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Access your Aervy account
        </p>

        {/* Role Switch */}
        <div className="flex mt-6 bg-gray-100 rounded-2xl p-1">

          <button
            onClick={() => setRole("user")}
            className={`w-1/2 py-3 rounded-2xl font-semibold transition-all
            ${role === "user" ? "bg-amber-500 text-white" : "text-gray-600"}`}
          >
            User
          </button>

          <button
            onClick={() => setRole("provider")}
            className={`w-1/2 py-3 rounded-2xl font-semibold transition-all
            ${role === "provider" ? "bg-amber-500 text-white" : "text-gray-600"}`}
          >
            Provider
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
          >
            Login as {role}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-500 font-semibold">
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login