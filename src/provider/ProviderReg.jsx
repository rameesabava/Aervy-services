import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa6'
import { MdHeadsetMic } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { providerRegisterAPI } from '../services/allAPI'
import toast from 'react-hot-toast'

function ProviderReg() {
const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            location: "",
            service: "",
            description: "",
            ratePerHour: "",
            identityCard: null
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(3, "Minimum 3 characters")
                .required("Full name is required"),

            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Minimum 6 characters required")
                .required("Password is required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),

            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
                .required("Phone number is required"),

            location: Yup.string()
                .required("Location is required"),

            service: Yup.string()
                .required("Please select a service"),

            description: Yup.string()
                .min(10, "Minimum 10 characters")
                .required("Description is required"),
            ratePerHour: Yup.number()
                .typeError("Rate must be a number")
                .positive("Rate must be positive")
                .required("Rate per hour is required"),

            identityCard: Yup.mixed()
                .required("Identity card is required")
        }),

        onSubmit: async (values, {resetForm}) => {
            // console.log(values)
            const reqBody = new FormData()

            reqBody.append("username", values.fullName)
            reqBody.append("email", values.email)
            reqBody.append("password", values.password)
            reqBody.append("phone", values.phone)
            reqBody.append("location", values.location)
            reqBody.append("service", values.service)
            reqBody.append("description", values.description)
            reqBody.append("ratePerHour", values.ratePerHour)

            reqBody.append("identityCard", values.identityCard)
            const result = await providerRegisterAPI(reqBody)
            if(result.status==201){
                toast.success("Registration Successful!!!")
                resetForm()
                
                
            }else{
                toast.error(result.response)
            
            }
            navigate('/login')
        }
    })


    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20" style={{ backgroundImage: "url('/providerreg.jfif')" }}>
            <div className="absolute inset-0 bg-black/70 h-200"></div>
            <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

                {/* left content */}
                <div className="text-white">

                    <p className="text-amber-500 font-semibold text-3xl mb-4">Join Aervy Today</p>

                    <h1 className="text-4xl md:text-7xl font-black leading-tight">Become a Trusted Service Provider</h1>

                    <p className="mt-6 text-lg text-gray-300 max-w-xl">Reach thousands of customers in Kochi looking for electricians, plumbers, tutors, beauticians, drivers, cleaners and more.</p>

                    <div className="mt-10 grid grid-cols-2 gap-5">
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex justify-center items-center gap-5">
                            <div><FaUsers className='text-amber-500 text-5xl' /></div>
                            <div>
                                <h3 className="font-bold text-xl">500+</h3>
                                <p className="text-gray-300">Active Customers</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10  flex justify-center items-center gap-5">
                            <div><MdHeadsetMic className='text-amber-500 text-5xl' /></div>

                            <div>
                                <h3 className="font-bold text-xl">24/7</h3>
                                <p className="text-gray-300">Booking Support</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 shadow-2xl">

                    <h2 className="text-3xl font-bold text-white mb-8">Provider Registration</h2>

                    <form className="space-y-5" onSubmit={formik.handleSubmit}>

                        <div>
                            <input name='fullName' value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {
                                formik.touched.fullName &&
                                formik.errors.fullName && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.fullName}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {
                                formik.touched.email &&
                                formik.errors.email && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.email}
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <input name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder="Password" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {
                                formik.touched.password &&
                                formik.errors.password && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.password}
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <input name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder="Confirm Password" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {
                                formik.touched.phone &&
                                formik.errors.phone && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.phone}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <input name="location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Location" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500" />
                            {
                                formik.touched.location &&
                                formik.errors.location && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.location}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <select name="service" value={formik.values.service} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500">
                                <option value="" className="text-black">Select Service</option>
                                <option value="Electrician" className="text-black">Electrician</option>
                                <option value="Plumber" className="text-black">Plumber</option>
                                <option value="Tutor" className="text-black">Tutor</option>
                                <option value="Cleaner" className="text-black">Cleaner</option>
                                <option value="Driver" className="text-black">Driver</option>
                                <option value="Beautician" className="text-black">Beautician</option>
                            </select>
                            {
                                formik.touched.service &&
                                formik.errors.service && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.service}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <textarea rows="4" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Tell us about your services..." className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500"></textarea>
                            {
                                formik.touched.description &&
                                formik.errors.description && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.description}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <input name="ratePerHour" value={formik.values.ratePerHour} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Rate Per Hour (in Rupee)" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500"></input>
                            {
                                formik.touched.ratePerHour &&
                                formik.errors.ratePerHour && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.ratePerHour}
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <label className="block text-white mb-2 font-medium">
                                Upload Identity Card
                            </label>

                            <input type="file" name="identityCard" accept="image/*,.pdf" onChange={(e) => { formik.setFieldValue("identityCard", e.currentTarget.files[0]) }} onBlur={() => formik.setFieldTouched("identityCard", true)} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white file:bg-amber-500 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white" />

                            {
                                formik.touched.identityCard &&
                                formik.errors.identityCard && (
                                    <p className='text-red-400 text-sm mt-1'>
                                        {formik.errors.identityCard}
                                    </p>
                                )
                            }
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:scale-[1.02] transition-all duration-300 text-white font-semibold py-4 rounded-2xl shadow-xl">
                            Register as Provider
                        </button>
                        <p className='text-gray-300 text-center'>Already have an account? <Link to={'/login'} className='text-amber-500'>Login</Link></p>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default ProviderReg