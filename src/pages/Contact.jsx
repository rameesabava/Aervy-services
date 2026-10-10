import React, { useRef } from "react";
import { IoMdMail } from "react-icons/io";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

function Contact() {
  const form = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      location: "",
      message: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .required("Full name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),

      location: Yup.string()
        .trim()
        .min(3, "Minimum 3 characters")
        .required("Location is required"),

      message: Yup.string()
        .trim()
        .min(10, "Message should be at least 10 characters")
        .required("Message is required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await emailjs.sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
          }
        );

        toast.success("Message sent successfully!");
        resetForm();
      } catch (error) {
        console.error("EmailJS error:", error);
        toast.error("Failed to send message. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const contactDetails = [
    {
      icon: <IoMdMail />,
      title: "Email Us",
      value: "info.csp24x7@gmail.com",
      href: "mailto:info.csp24x7@gmail.com",
    },
    {
      icon: <TbDeviceLandlinePhone />,
      title: "Call Us",
      value: "+91 82817 32890",
      href: "tel:+918281732890",
    },
    {
      icon: <FaLocationDot />,
      title: "Our Location",
      value: "Kothamangalam, Kerala, India",
    },
    
  ];

  const inputClass =
    "block w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 sm:px-5 sm:py-4";

  const renderFieldError = (name) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="mt-1.5 text-sm text-red-600" role="alert">
        {formik.errors[name]}
      </p>
    ) : null;

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-gray-800">
      {/* Hero and Contact Information */}
      <section className="relative isolate">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/kochi.jpg')" }}
          aria-hidden="true"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 -z-10 bg-white/80 sm:bg-white/75"
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-20 xl:gap-16">
          {/* Left content */}
          <div className="min-w-0 py-2 sm:py-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-700 sm:mb-4 sm:text-base">
              We'd love to hear from you
            </p>

            <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Contact{" "}
              <span className="text-red-600">CSP 24 × 7</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-700 sm:mt-6 sm:text-lg sm:leading-8">
              We're here to help you find trusted local services in Kerala.
              Have questions, feedback, or want to become a provider?
              Reach out to us.
            </p>

            <div className="mt-6 h-1.5 w-20 rounded-full bg-red-600 sm:mt-8 sm:w-24" />

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <a
                href="#contact-form"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-base"
              >
                Send a Message
              </a>

              <a
                href="tel:+919497856371"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-red-200 bg-white/90 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-base"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* Right contact details */}
          <div className="min-w-0 rounded-2xl border border-red-100 bg-white/95 p-5 shadow-xl backdrop-blur-md sm:rounded-3xl sm:p-7 md:p-8 lg:p-7 xl:p-9">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-red-600">
              We're here to help
            </p>

            <h2 className="mb-6 text-2xl font-extrabold text-gray-900 sm:mb-8 sm:text-3xl">
              Get in touch
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {contactDetails.map((item) => (
                <div
                  key={item.title}
                  className="flex min-w-0 items-start gap-3 sm:gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      {item.title}
                    </h3>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words text-sm leading-6 text-gray-600 transition hover:text-red-600 sm:text-base"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words text-sm leading-6 text-gray-600 sm:text-base">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact-form"
        className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20"
      >
        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-red-100 bg-white p-5 shadow-lg sm:rounded-3xl sm:p-8 md:p-10 lg:p-12">
          {/* Form heading */}
          <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-600 sm:text-sm">
              Contact our team
            </p>

            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Send us a message
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-600 sm:w-24" />

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              Have a question or need assistance? Fill out the form below
              and we'll get back to you as soon as possible.
            </p>
          </div>

          <form
            ref={form}
            onSubmit={formik.handleSubmit}
            className="space-y-5 sm:space-y-6"
            noValidate
          >
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="min-w-0">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.username && formik.errors.username
                  )}
                  aria-describedby={
                    formik.touched.username && formik.errors.username
                      ? "username-error"
                      : undefined
                  }
                  className={inputClass}
                />

                {formik.touched.username && formik.errors.username && (
                  <p
                    id="username-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {formik.errors.username}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address <span className="text-red-600">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.email && formik.errors.email
                  )}
                  aria-describedby={
                    formik.touched.email && formik.errors.email
                      ? "email-error"
                      : undefined
                  }
                  className={inputClass}
                />

                {formik.touched.email && formik.errors.email && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone and Location */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="min-w-0">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number <span className="text-red-600">*</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="10-digit phone number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.phone && formik.errors.phone
                  )}
                  aria-describedby={
                    formik.touched.phone && formik.errors.phone
                      ? "phone-error"
                      : undefined
                  }
                  className={inputClass}
                />

                {formik.touched.phone && formik.errors.phone && (
                  <p
                    id="phone-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Location <span className="text-red-600">*</span>
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Enter your location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(
                    formik.touched.location && formik.errors.location
                  )}
                  aria-describedby={
                    formik.touched.location && formik.errors.location
                      ? "location-error"
                      : undefined
                  }
                  className={inputClass}
                />

                {formik.touched.location && formik.errors.location && (
                  <p
                    id="location-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {formik.errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="min-w-0">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Your Message <span className="text-red-600">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(
                  formik.touched.message && formik.errors.message
                )}
                aria-describedby={
                  formik.touched.message && formik.errors.message
                    ? "message-error"
                    : undefined
                }
                className={`${inputClass} min-h-32 resize-y`}
              />

              {formik.touched.message && formik.errors.message && (
                <p
                  id="message-error"
                  className="mt-1.5 text-sm text-red-600"
                  role="alert"
                >
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4"
            >
              {formik.isSubmitting ? "Sending Message..." : "Send Message"}
            </button>

            <p className="text-center text-xs leading-5 text-gray-500 sm:text-sm">
              Your information will be used to respond to your enquiry.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact