import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields")
      return
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // simple local storage auth (for now)
    localStorage.setItem("user", JSON.stringify(form))

    alert("Registration successful!")

    navigate("/services")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8">

        <h1 className="text-3xl font-black text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register to book trusted services
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500"
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-500 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Register