import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/allAPI";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaTools,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    email: Yup.string()
      .trim()
      .email("Please enter a valid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),
  });

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
      try {
        setIsLoading(true);

        // Do not send confirmPassword unless your backend requires it.
        const { confirmPassword, ...registerData } = values;

        const result = await registerAPI({
          ...registerData,
          username: registerData.username.trim(),
          email: registerData.email.trim(),
        });

        if (result.status === 201) {
          toast.success("Registration successful! Please log in.");
          navigate("/login");
        } else {
          toast.error(
            result.response?.data?.message ||
              "Registration failed. Please try again."
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to register. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const inputClass = (field) =>
    `w-full min-w-0 rounded-xl border bg-gray-50 py-3.5 pl-11 pr-11 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 sm:text-base ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-red-500 focus:ring-red-100"
    }`;

  const renderError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs text-red-600 sm:text-sm">
        {formik.errors[field]}
      </p>
    ) : null;

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-red-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Background decoration */}
      <div
        className="absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-red-200/50 blur-3xl sm:h-80 sm:w-80"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-red-100 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />

      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-red-100 bg-white shadow-xl sm:rounded-3xl lg:grid-cols-2">
        {/* Left branding panel — desktop only */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-red-600 p-8 text-white lg:flex xl:p-12">
          <div
            className="absolute -right-20 top-16 h-64 w-64 rounded-full border-[40px] border-white/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[40px] border-white/10"
            aria-hidden="true"
          />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3">
            <img
              src="/icon.png"
              alt="CSP 24 × 7 logo"
              className="h-12 w-12 rounded-xl bg-white object-contain p-1"
            />
            <span className="text-2xl font-black">CSP 24 × 7</span>
          </Link>

          <div className="relative z-10 my-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              <FaTools />
            </div>

            <h1 className="text-4xl font-black leading-tight xl:text-5xl">
              Good help,
              <span className="block text-red-100">just around you.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-8 text-red-50">
              Join CSP 24 × 7 to discover local services, connect with
              professionals, and make everyday tasks easier.
            </p>

            <div className="mt-8 space-y-4 text-sm font-medium text-red-50">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="shrink-0 text-xl" />
                Convenient local service discovery
              </div>
              <div className="flex items-center gap-3">
                <FaTools className="shrink-0 text-xl" />
                A variety of services in one place
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-red-100">
            Find help. Connect locally. Get started.
          </p>
        </section>

        {/* Registration form */}
        <section className="min-w-0 p-5 sm:p-8 md:p-10 lg:p-8 xl:p-12">
          {/* Mobile branding */}
          <Link to="/" className="mb-6 flex flex-col items-center lg:hidden">
            <img
              src="/icon.png"
              alt="CSP 24 × 7 logo"
              className="mb-2 h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <span className="text-xl font-black text-red-700 sm:text-2xl">
              CSP 24 × 7
            </span>
            <span className="mt-1 text-xs text-gray-500">
              Services at your doorstep
            </span>
          </Link>

          <div className="mb-6 text-center lg:text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
              Get started today
            </p>

            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Sign up to discover and book trusted local services.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
            {/* Full name */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">
                <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("username")}
                  aria-invalid={Boolean(
                    formik.touched.username && formik.errors.username
                  )}
                  aria-describedby={
                    formik.touched.username && formik.errors.username
                      ? "username-error"
                      : undefined
                  }
                />
              </div>

              {renderError("username")}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("email")}
                  aria-invalid={Boolean(
                    formik.touched.email && formik.errors.email
                  )}
                  aria-describedby={
                    formik.touched.email && formik.errors.email
                      ? "email-error"
                      : undefined
                  }
                />
              </div>

              {renderError("email")}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>

              <div className="relative">
                <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  placeholder="10-digit phone number"
                  value={formik.values.phone}
                  onChange={(e) => {
                    const phone = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    formik.setFieldValue("phone", phone);
                  }}
                  onBlur={formik.handleBlur}
                  className={inputClass("phone")}
                  aria-invalid={Boolean(
                    formik.touched.phone && formik.errors.phone
                  )}
                  aria-describedby={
                    formik.touched.phone && formik.errors.phone
                      ? "phone-error"
                      : undefined
                  }
                />
              </div>

              {renderError("phone")}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("password")}
                  aria-invalid={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  aria-describedby={
                    formik.touched.password && formik.errors.password
                      ? "password-error"
                      : undefined
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 transition hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {renderError("password")}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass("confirmPassword")}
                  aria-invalid={Boolean(
                    formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                  )}
                  aria-describedby={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 transition hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {renderError("confirmPassword")}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm leading-6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-red-600 transition hover:text-red-800"
            >
              Login
            </Link>
          </p>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition hover:text-red-600"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register