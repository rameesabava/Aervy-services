import React, { useRef } from 'react'
import { IoMdMail } from "react-icons/io";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const form = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      message: ""
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
        .min(3, "Minimum 3 characters")
        .required("Location is required"),

      message: Yup.string()
        .min(10, "Message should be at least 10 characters")
        .required("Message is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      }
      )
        .then(() => {
          toast.success("Message sent successfully!");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to send message");
        });

    }
  })
  return (

    <div className="bg-gray-400 min-h-screen text-gray-800 overflow-hidden">
      <Toaster />
      {/* contact section */}
      <section className="fixed top-0 left-0 w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/kochi.jpg')" }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-full grid lg:grid-cols-2 gap-10 items-center">

          {/* Left text content */}
          <div>
            <p className="text-green-950 font-bold text-lg mb-4">We'd love to hear from you</p>

            <h1 className="text-5xl md:text-7xl font-black">
              Contact <span className="text-amber-700">Aervy</span>
            </h1>

            <p className="mt-6 text-lg max-w-xl font-semibold">
              We're here to help you find trusted local services in Kochi. Have questions, feedback, or want to become a provider? Reach out anytime.
            </p>

          </div>

          {/* Right contact */}
          <div className="bg-white/80 shadow-2xl rounded-[35px] p-8 border border-white/40">
            <h2 className="text-3xl font-bold mb-8">Get in touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  <IoMdMail />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-600">hello@aervy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  <TbDeviceLandlinePhone />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-600">+91 94978 56371</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  <FaLocationDot />
                </div>
                <div>
                  <p className="font-semibold">Our Location</p>
                  <p className="text-gray-600">Kochi, Kerala, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  <FaClock />
                </div>
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="text-gray-600">Mon - Sat : 9 AM - 8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* send message form */}
      <section className="relative w-full mx-auto px-6 md:px-10 z-20 mb-3 mt-[90vh]">
        <div className="bg-white shadow-2xl rounded-[35px] p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Send us a message</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4">
              We’ll get back to you as soon as possible.
            </p>
          </div>

          <form ref={form} onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <input name="fullName" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Full Name" className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400" />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.fullName}
                  </p>

                )}
              </div>
              <div>
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder="Email Address" className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400" />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Phone Number" className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400" />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div>
                <input name="location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Location" className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400" />
                {formik.touched.location && formik.errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.location}
                  </p>
                )}
              </div>
            
            </div>
            <div>
              <textarea name="message" value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} rows="3" placeholder="Your Message" className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.message}
                </p>
              )}
            </div>
            <button type='submit' className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:scale-[1.01] transition-all duration-300 text-white font-semibold py-4 rounded-2xl shadow-lg">
              Send Message
            </button>

          </form>
        </div>
      </section>

    </div>
  )
}

export default Contact