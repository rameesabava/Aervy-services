import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routeContext } from '../context API/RouteGuardContext'


function PageNotFound() {

  const {role, setRole, authorisedUser, setAuthorisedUser} = useContext(routeContext)
  const navigate = useNavigate()

  const backToHome = ()=>{
    if(role=='user'){
      navigate('/user')
    }else if(role=='provider'){
      navigate('/provider')
    }else{
      navigate('/admin')
    }
  }
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <img className='w-100' src="https://i.pinimg.com/originals/fa/e9/72/fae9722953261935d2c43b74c0881559.gif" alt="pnf" />
      <p>Oh No!</p>
      <h3 className='text-2xl font-medium'>Look Like You're Lost</h3>
      <p>The page you are looking for is not available</p>
{ authorisedUser?
<button onClick={backToHome} className='bg-black mt-5 px-3 py-2 text-white'>Home</button>
:
<Link to={'/'} className='bg-black mt-5 px-3 py-2 text-white'>Home</Link>
}
    </div>
  )
}

export default PageNotFound