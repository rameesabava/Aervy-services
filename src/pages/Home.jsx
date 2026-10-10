import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaTools } from "react-icons/fa";

function Home() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-76px)] w-full items-center justify-center overflow-hidden bg-gray-950 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
        aria-hidden="true"
      />

      {/* Decorative red glow */}
      <div
        className="absolute -right-24 top-10 -z-10 h-64 w-64 rounded-full bg-red-600/20 blur-3xl sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Brand */}
        <Link
          to="/"
          aria-label="CSP 24 × 7 home"
          className="inline-flex max-w-full items-center justify-center gap-3 rounded-2xl border border-red-200/70 bg-white/95 px-5 py-3 shadow-xl backdrop-blur-sm transition hover:scale-[1.02] sm:gap-4 sm:px-8 sm:py-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white sm:h-12 sm:w-12">
            <FaTools className="text-xl sm:text-2xl" />
          </span>

          <span className="text-left">
            <span className="block text-xl font-black tracking-tight text-red-700 sm:text-2xl md:text-3xl">
              CSP 24 × 7
            </span>
            <span className="mt-0.5 block text-[10px] font-medium text-gray-500 sm:text-xs">
              SERVICES AT YOUR DOORSTEP
            </span>
          </span>
        </Link>

        {/* Hero Heading */}
        <h1 className="mt-8 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:mt-10 sm:text-4xl md:text-5xl lg:text-7xl">
          Find trusted pros
          <span className="mt-1 block">
            in <span className="text-red-500">Kerala</span>, instantly.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl px-1 text-sm leading-7 text-gray-200 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
          Book electricians, plumbers, tutors and more — with trusted local
          professionals ready to help with your everyday needs.
        </p>

        {/* Trust Indicators */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-200 sm:gap-x-6 sm:text-sm">
          <span className="flex items-center gap-2">
            <FaCheckCircle className="shrink-0 text-red-400" />
            Local Professionals
          </span>

          <span className="flex items-center gap-2">
            <FaCheckCircle className="shrink-0 text-red-400" />
            Easy Booking
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            to="/services"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-red-600 bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl transition duration-300 hover:border-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-auto sm:min-w-48 sm:px-8 sm:py-4 sm:text-base"
          >
            Find Services
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/provider"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white bg-white px-6 py-3.5 text-sm font-bold text-red-700 shadow-xl transition duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-auto sm:min-w-48 sm:px-8 sm:py-4 sm:text-base"
          >
            Join as Provider
          </Link>
        </div>

        {/* Supporting Text */}
        <p className="mt-6 max-w-xl text-xs leading-6 text-gray-300 sm:mt-8 sm:text-sm">
          Looking for work opportunities? Join our provider community and
          connect with customers.
        </p>
      </div>
    </main>
  );
}

export default Home