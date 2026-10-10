import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";
import {
  googleLoginAPI,
  loginAPI,
  providerLoginAPI,
} from "../services/allAPI";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { routeContext } from "../context API/RouteGuardContext";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setAuthorisedUser,
    setRole: setContextRole,
  } = useContext(routeContext);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userDetails;

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    try {
      setIsLoading(true);

      const result =
        role === "user"
          ? await loginAPI({
              email: email.trim(),
              password,
            })
          : await providerLoginAPI({
              email: email.trim(),
              password,
            });

      if (result.status === 200) {
        const user = result.data.user;

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));

        setAuthorisedUser(true);

        if (role === "provider") {
          setContextRole("provider");
          navigate(`/provider/${user._id}`);
        } else {
          setContextRole(user.role);

          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/services");
          }
        }

        toast.success("Login successful!");
      } else {
        toast.error(
          result.response?.data?.message ||
            "Login failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error("Google login failed. Please try again.");
      return;
    }

    try {
      setIsLoading(true);

      const { email, name } = jwtDecode(
        credentialResponse.credential
      );

      const result = await googleLoginAPI({
        username: name,
        email,
        password: "googlePassword",
      });

      if (result.status === 200) {
        const user = result.data.user;

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));

        setAuthorisedUser(true);
        setContextRole(user.role);

        toast.success("Login successful!");

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/services");
        }
      } else {
        toast.error("Google login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to sign in with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-red-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

      {/* Decorative background */}
      <div
        className="absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-red-200/50 blur-3xl sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <div
        className="absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-red-100 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />

      {/* Login Card */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-red-100 bg-white shadow-xl sm:rounded-3xl lg:grid-cols-2">

        {/* Left Branding Panel - Desktop */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-red-600 p-8 text-white lg:flex xl:p-12">
          <div
            className="absolute -right-20 top-20 h-64 w-64 rounded-full border-[40px] border-white/10"
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

            <span className="text-2xl font-black">
              CSP 24 × 7
            </span>
          </Link>

          <div className="relative z-10 my-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              <FaTools />
            </div>

            <h2 className="text-4xl font-black leading-tight xl:text-5xl">
              Local services,
              <span className="block text-red-100">
                made simple.
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-8 text-red-50">
              Discover local professionals or grow your service business
              with CSP 24 × 7.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-red-50">
              <FaShieldAlt className="text-xl" />
              Your local services platform
            </div>
          </div>

          <p className="relative z-10 text-sm text-red-100">
            Find help. Connect locally. Get started.
          </p>
        </section>

        {/* Right Login Panel */}
        <section className="min-w-0 p-5 sm:p-8 md:p-10 lg:p-8 xl:p-12">

          {/* Mobile Brand */}
          <Link
            to="/"
            className="mb-7 flex flex-col items-center lg:hidden"
          >
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

          <div className="mb-7 text-center lg:text-left">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red-600">
              Welcome back
            </p>

            <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Login to your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Enter your details to continue.
            </p>
          </div>

          {/* Role Selector */}
          <div
            className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1 sm:rounded-2xl"
            role="group"
            aria-label="Choose login type"
          >
            <button
              type="button"
              onClick={() => setRole("user")}
              aria-pressed={role === "user"}
              className={`min-h-11 rounded-lg px-3 py-3 text-sm font-bold transition sm:rounded-xl sm:text-base ${
                role === "user"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-red-600"
              }`}
            >
              Customer
            </button>

            <button
              type="button"
              onClick={() => setRole("provider")}
              aria-pressed={role === "provider"}
              className={`min-h-11 rounded-lg px-3 py-3 text-sm font-bold transition sm:rounded-xl sm:text-base ${
                role === "provider"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-red-600"
              }`}
            >
              Provider
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-red-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                <FaEnvelope className="shrink-0 text-gray-400" />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    })
                  }
                  required
                  className="min-h-12 w-full min-w-0 bg-transparent px-3 py-3 text-base outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-red-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                <FaLock className="shrink-0 text-gray-400" />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  required
                  className="min-h-12 w-full min-w-0 bg-transparent px-3 py-3 text-base outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 py-2 text-xs font-bold text-red-600 hover:text-red-800 sm:text-sm"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Login as {role === "user" ? "Customer" : "Provider"}
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 sm:text-sm">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Login */}
          <div className="flex min-w-0 justify-center">
            <div className="max-w-full">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed")}
                useOneTap={false}
                width="300"
              />
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-7 text-center text-sm leading-6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to={role === "user" ? "/register" : "/provider"}
              className="font-bold text-red-600 transition hover:text-red-800"
            >
              Register
            </Link>
          </p>

          <div className="mt-5 text-center">
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

export default Login