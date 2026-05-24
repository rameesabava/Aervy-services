import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserHome from './user/UserHome'
import Header from './components/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import ProviderReg from './provider/ProviderReg'
import Login from './pages/Login'
import Services from './user/Services'
import ProviderDashboard from './provider/ProviderDashboard'
import ProviderProfile from './provider/ProviderProfile'
import Messages from './provider/Messages'
import Register from './user/Register'
import AdminDashboard from './admin/AdminDashboard'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/services' element={<Services />} />

        <Route path='/admin' element={<AdminDashboard/>}/>
        
        <Route path='/user' element={<UserHome />} />
        <Route path='/register' element={<Register/>}/>

        <Route path='/provider' element={<ProviderReg />} />
        <Route path='/provider/:id' element={<ProviderDashboard />} />
        <Route path='/profile/:id' element={<ProviderProfile/>}/>
        <Route path='/messages' element={<Messages/>}/>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
