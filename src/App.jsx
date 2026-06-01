import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ViewProvider from './user/ViewProvider'
import Header from './components/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ProviderReg from './provider/ProviderReg'
import Login from './pages/Login'
import Services from './user/Services'
import ProviderDashboard from './provider/ProviderDashboard'
import ProviderProfile from './provider/ProviderProfile'
import Register from './user/Register'
import AdminDashboard from './admin/AdminDashboard'
import { Toaster } from "react-hot-toast";
import PaymentSuccess from './user/PaymentSuccess'
import PaymentFail from './user/PaymentFail'
import ProviderBookings from './provider/ProviderBookings'
import { useContext } from 'react'
import { routeContext } from './context API/RouteGuardContext'
import PageNotFound from './pages/PageNotFound'
import UserBookings from './user/UserBookings'


function App() {
    const { role } = useContext(routeContext)
  

  return (
    <>
     <Toaster position="bottom-center" />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register/>}/>
          <Route path='/provider' element={<ProviderReg />} />
          
        {role=="admin" && 
        <Route path='/admin' element={<AdminDashboard/>}/>}
        
        {role=="user" &&
        <>
          <Route path='/provider/view/:id' element={<ViewProvider/>}/>
          <Route path='/user-bookings/:id' element={<UserBookings/>}/>
          <Route path='/payment-success' element={<PaymentSuccess/>}/>
          <Route path='/payment-fail' element={<PaymentFail/>}/>
        </>
        }

        {role=="provider" &&
        <>
          <Route path='/provider/:id' element={<ProviderDashboard />} />
          <Route path='/provider-profile/:id' element={<ProviderProfile/>}/>
          <Route path='/provider/bookings/:id' element={<ProviderBookings/>}/>
        </>
        }
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
