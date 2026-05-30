import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../services/allAPI'
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {

  const navigate = useNavigate()

  // formik validation
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Minimum 3 characters required")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required")
  })


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },

    validationSchema,

    onSubmit: async (values) => {

      const result = await registerAPI(values)
      console.log(result)
      if (result.status == 201) {
        toast.success("Successfully Registered...Please Login")
        
      } else {

        toast.error(result.response)
        
      }

navigate("/login")
    }
  })


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8">

        <h1 className="text-3xl font-black text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register to book trusted services
        </p>

        <div className="mt-8 space-y-5">

          <form onSubmit={formik.handleSubmit}>
            <input type="text" name='username' placeholder="Full Name" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 mb-3" />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}

            <input type="email" name='email' placeholder="Email Address" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 mb-3" />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
            <input type="password" name='password' placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 mb-3" />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <input type="password" name='confirmPassword' placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 mb-3" />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </p>
            )}

            <input type="text" name='phone' placeholder="Phone Number" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500 mb-3" />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
            <button type='submit' className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300">
              Register
            </button>
          </form>

        </div>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?
          <Link to="/login" className="text-amber-500 font-semibold ms-2">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Register