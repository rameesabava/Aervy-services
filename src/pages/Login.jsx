import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginAPI, loginAPI, providerLoginAPI } from '../services/allAPI'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routeContext } from '../context API/RouteGuardContext';

function Login() {

  const navigate = useNavigate()

  const [role, setRole] = useState("user")
  const { authorisedUser, setAuthorisedUser, setRole: setContextRole } = useContext(routeContext)

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.error("Please fill all fields")
    } else if (role == "user") {
      const result = await loginAPI(userDetails)
      if (result.status == 200) {

        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("user", JSON.stringify(result.data.user))

        setAuthorisedUser(true)
        setContextRole(result.data.user.role)

        const user = result.data.user

        if (user.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/services")
        }
      } else {
        toast.error(result.response)
      }
    } else if (role == "provider") {
      const result = await providerLoginAPI(userDetails)
      if (result.status == 200) {

        const id = result.data.user._id

        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("user", JSON.stringify(result.data.user))

        setAuthorisedUser(true)
        setContextRole("provider")

        navigate(`/provider/${id}`)
      } else {
        toast.error(result.response)

      }

    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Inside handleGoogleLogin");
    console.log(credentialResponse);
    const { email, name, picture } = jwtDecode(credentialResponse.credential)
    console.log(email, name, picture);
    // api call
    const result = await googleLoginAPI({ username: name, email, password: "googlePassword" })
    if (result.status == 200) {

      sessionStorage.setItem("token", result.data.token)
      sessionStorage.setItem("user", JSON.stringify(result.data.user))

      setAuthorisedUser(true)
      setContextRole(result.data.user.role)

      navigate('/services')
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8">

        <h1 className="text-3xl font-black text-center text-gray-800">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Access your Aervy account
        </p>

        {/* role tab */}
        <div className="flex mt-6 bg-gray-100 rounded-2xl p-1">

          <button onClick={() => setRole("user")} className={`w-1/2 py-3 rounded-2xl font-semibold transition-all ${role === "user" ? "bg-amber-500 text-white" : "text-gray-600"}`}>User</button>

          <button onClick={() => setRole("provider")} className={`w-1/2 py-3 rounded-2xl font-semibold transition-all ${role === "provider" ? "bg-amber-500 text-white" : "text-gray-600"}`}>Provider</button>

        </div>

        {/* Form */}
        <div className="mt-6 space-y-5">

          <input type="email" name="email" placeholder="Email Address" value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500" />

          <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500" />

          <button onClick={handleLogin} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300">Login as {role}</button>

        </div>
        {/* google authentication */}
        <div className='flex justify-center mt-2 items-center'>
          <GoogleLogin
            onSuccess={credentialResponse => {
              handleGoogleLogin(credentialResponse);


            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </div>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?
          <Link
            to={role === "user" ? "/register" : "/provider"}
            className="text-amber-500 font-semibold ms-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login