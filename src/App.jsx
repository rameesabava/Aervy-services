import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserHome from './user/UserHome'
import ProviderHome from './provider/ProviderHome'
import Header from './components/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />


        <Route path='/user' element={<UserHome />} />

        <Route path='/provider' element={<ProviderHome />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
