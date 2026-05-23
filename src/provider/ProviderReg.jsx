import React from 'react'
import { FaUsers } from 'react-icons/fa6'
import { MdHeadsetMic } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function ProviderReg() {
     const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            service: "",
            description: "",
            identityCard: null
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(3, "Minimum 3 characters")
                .required("Full name is required"),

            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),

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

            identityCard: Yup.mixed()
                .required("Identity card is required")
        }),

        onSubmit: (values) => {
            console.log(values)
            alert("Registration Successful")
        }
    })


    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20" style={{backgroundImage: "url('/providerreg.jfif')" }}>
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
                                <option className="text-black">Select Service</option>
                                <option className="text-black">Electrician</option>
                                <option className="text-black">Plumber</option>
                                <option className="text-black">Tutor</option>
                                <option className="text-black">Cleaner</option>
                                <option className="text-black">Driver</option>
    
                                <option className="text-black">Beautician</option>
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
                            <textarea rows="4" name="description"  value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Tell us about your services..."
                                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-amber-500"></textarea>
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
                            <label className="block text-white mb-2 font-medium">
                                Upload Identity Card
                            </label>

                            <input type="file" name="identityCard" accept="image/*,.pdf" onChange={(event) => {
                                    formik.setFieldValue("identityCard", event.currentTarget.files[0])}} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white file:bg-amber-500 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white" />

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