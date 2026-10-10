import React, { useState } from "react";
import { FaUsers, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileAlt,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaMagic,
  FaIdCard,
} from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getDescriptionAI,
  providerRegisterAPI,
} from "../services/allAPI";
import toast from "react-hot-toast";

function ProviderReg() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .required("Full name is required"),

    email: Yup.string()
      .trim()
      .email("Enter a valid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),

    location: Yup.string()
      .trim()
      .required("Location is required"),

    service: Yup.string()
      .required("Please select a service"),

    description: Yup.string()
      .trim()
      .min(10, "Minimum 10 characters required")
      .required("Description is required"),

    ratePerHour: Yup.number()
      .typeError("Rate must be a number")
      .positive("Rate must be greater than zero")
      .required("Rate per hour is required"),

    identityCard: Yup.mixed()
      .required("Identity card is required")
      .test(
        "file-size",
        "File size must be 5 MB or less",
        (file) => !file || file.size <= 5 * 1024 * 1024
      )
      .test(
        "file-type",
        "Upload an image or PDF file",
        (file) => {
          if (!file) return true;

          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
          ];

          return allowedTypes.includes(file.type);
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      location: "",
      service: "",
      description: "",
      ratePerHour: "",
      identityCard: null,
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        const reqBody = new FormData();

        reqBody.append("username", values.username.trim());
        reqBody.append("email", values.email.trim());
        reqBody.append("password", values.password);
        reqBody.append("phone", values.phone);
        reqBody.append("location", values.location.trim());
        reqBody.append("service", values.service);
        reqBody.append("description", values.description.trim());
        reqBody.append("ratePerHour", values.ratePerHour);
        reqBody.append("identityCard", values.identityCard);

        const result = await providerRegisterAPI(reqBody);

        if (result.status === 201) {
          toast.success("Registration successful! Please log in.");
          resetForm();
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

  const generateDescriptionAI = async () => {
    if (!formik.values.service) {
      formik.setFieldTouched("service", true);
      toast.error("Please select a service first.");
      return;
    }

    try {
      setIsGenerating(true);

      const result = await getDescriptionAI({
        service: formik.values.service,
      });

      if (result.status === 200 && result.data.content) {
        formik.setFieldValue("description", result.data.content);
        formik.setFieldTouched("description", true, false);
        toast.success("Description generated successfully!");
      } else {
        toast.error("Could not generate a description. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClass = (field) =>
    `w-full min-w-0 rounded-xl border bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 sm:text-base ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-red-500 focus:ring-red-100"
    }`;

  const renderError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="mt-1.5 text-xs text-red-600 sm:text-sm">
        {formik.errors[field]}
      </p>
    ) : null;

  const fields = [
    {
      name: "username",
      label: "Full Name",
      placeholder: "Enter your full name",
      icon: <FaUser />,
      type: "text",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      icon: <FaEnvelope />,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "10-digit phone number",
      icon: <FaPhone />,
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Enter your city or area",
      icon: <FaMapMarkerAlt />,
      type: "text",
      autoComplete: "address-level2",
    },
  ];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gray-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Background decorations */}
      <div
        className="absolute -left-28 -top-28 -z-10 h-72 w-72 rounded-full bg-red-100 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-24 -z-10 h-80 w-80 rounded-full bg-red-100/80 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12 xl:gap-16">
        {/* Left branding panel */}
        <section className="min-w-0 lg:sticky lg:top-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-3 sm:mb-8"
          >
            <img
              src="/icon.png"
              alt="CSP 24 × 7 logo"
              className="h-11 w-11 rounded-xl object-contain sm:h-14 sm:w-14"
            />
            <span className="text-xl font-black tracking-tight text-red-700 sm:text-2xl">
              CSP 24 × 7
            </span>
          </Link>

          <div className="overflow-hidden rounded-2xl bg-red-600 p-6 text-white shadow-lg sm:rounded-3xl sm:p-8 lg:p-8 xl:p-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
              <FaUsers />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-100 sm:text-sm">
              Join Our Network
            </p>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl xl:text-5xl">
              Turn your skills into
              <span className="block text-red-100">new opportunities.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-red-50 sm:mt-5 sm:text-base sm:leading-8">
              Connect with customers looking for local services. Create your
              provider profile and help people find the right professional
              for their needs.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xl">
                  <FaUsers />
                </div>
                <div>
                  <h3 className="font-bold">Reach Customers</h3>
                  <p className="mt-1 text-xs leading-5 text-red-100">
                    Showcase your services
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xl">
                  <MdHeadsetMic />
                </div>
                <div>
                  <h3 className="font-bold">Easy Connections</h3>
                  <p className="mt-1 text-xs leading-5 text-red-100">
                    Connect with local users
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 border-t border-white/20 pt-5">
              <FaShieldAlt className="mt-1 shrink-0 text-xl text-red-100" />
              <p className="text-xs leading-6 text-red-50 sm:text-sm">
                Submit your details and identity document for the platform's
                provider registration process.
              </p>
            </div>
          </div>

          <div className="mt-5 hidden items-center justify-center gap-6 text-sm text-gray-500 sm:flex">
            <span className="flex items-center gap-2">
              <FaClock className="text-red-600" />
              Simple registration
            </span>
            <span className="flex items-center gap-2">
              <FaShieldAlt className="text-red-600" />
              Provider onboarding
            </span>
          </div>
        </section>

        {/* Provider registration form */}
        <section className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8 md:p-10">
          <div className="mb-7 sm:mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm">
              Provider Registration
            </p>

            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Create your provider profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Enter your details and tell customers what you do.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Personal information */}
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className="min-w-0"
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {field.icon}
                      </span>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        inputMode={
                          field.name === "phone" ? "numeric" : undefined
                        }
                        maxLength={field.name === "phone" ? 10 : undefined}
                        placeholder={field.placeholder}
                        value={formik.values[field.name]}
                        onChange={(e) => {
                          if (field.name === "phone") {
                            formik.setFieldValue(
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            );
                          } else {
                            formik.handleChange(e);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        className={`${inputClass(field.name)} pl-11`}
                        aria-invalid={Boolean(
                          formik.touched[field.name] &&
                            formik.errors[field.name]
                        )}
                      />
                    </div>

                    {renderError(field.name)}
                  </div>
                ))}
              </div>
            </div>

            {/* Passwords */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
                Account Security
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
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
                      placeholder="Create password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("password")} pl-11 pr-11`}
                      aria-invalid={Boolean(
                        formik.touched.password && formik.errors.password
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {renderError("password")}
                </div>

                <div className="min-w-0">
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
                      placeholder="Confirm password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("confirmPassword")} pl-11 pr-11`}
                      aria-invalid={Boolean(
                        formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                      )}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
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
              </div>
            </div>

            {/* Service details */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700">
                Service Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Service Category
                  </label>

                  <div className="relative">
                    <FaBriefcase className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <select
                      id="service"
                      name="service"
                      value={formik.values.service}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("service")} appearance-none pl-11`}
                    >
                      <option value="">Select your service</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Tutor">Tutor</option>
                      <option value="Cleaner">Cleaner</option>
                      <option value="Driver">Driver</option>
                      <option value="Beautician">Beautician</option>
                    </select>
                  </div>

                  {renderError("service")}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    About Your Service
                  </label>

                  <div className="relative">
                    <FaFileAlt className="pointer-events-none absolute left-4 top-4 text-gray-400" />

                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Describe your skills, experience, and services..."
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("description")} resize-y pl-11`}
                    />
                  </div>

                  {renderError("description")}

                  <div className="mt-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-xs leading-5 text-gray-400">
                      Write at least 10 characters.
                    </p>

                    <button
                      type="button"
                      onClick={generateDescriptionAI}
                      disabled={isGenerating || !formik.values.service}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaMagic />
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ratePerHour"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Hourly Rate (₹)
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                      ₹
                    </span>

                    <input
                      id="ratePerHour"
                      name="ratePerHour"
                      type="number"
                      min="1"
                      step="any"
                      inputMode="decimal"
                      placeholder="e.g. 500"
                      value={formik.values.ratePerHour}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass("ratePerHour")} pl-11`}
                    />
                  </div>

                  {renderError("ratePerHour")}
                </div>
              </div>
            </div>

            {/* Identity document */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
                Identity Verification
              </h3>

              <label
                htmlFor="identityCard"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Upload Identity Card
              </label>

              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-red-400 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
                    <FaIdCard />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Choose your identity document
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      JPG, PNG, WEBP, or PDF. Maximum size: 5 MB.
                    </p>

                    <input
                      id="identityCard"
                      name="identityCard"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0] || null;
                        formik.setFieldValue("identityCard", file);
                        formik.setFieldTouched("identityCard", true, false);
                      }}
                      onBlur={() =>
                        formik.setFieldTouched("identityCard", true)
                      }
                      className="mt-3 block w-full min-w-0 text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-red-700 sm:file:text-sm"
                    />

                    {formik.values.identityCard && (
                      <p className="mt-2 break-all text-xs font-medium text-gray-600">
                        Selected: {formik.values.identityCard.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {renderError("identityCard")}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || isGenerating}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Registering...
                </>
              ) : (
                <>
                  Register as Provider
                  <FaArrowRight />
                </>
              )}
            </button>

            <p className="text-center text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-red-600 transition hover:text-red-800"
              >
                Login
              </Link>
            </p>

            <p className="text-center">
              <Link
                to="/"
                className="text-sm font-medium text-gray-500 transition hover:text-red-600"
              >
                ← Back to Home
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ProviderReg