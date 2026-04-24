import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage/Home'
import './index.css'
import About from './LandingPage/About'
import HowItWorks from './LandingPage/HowItWorks'
import { useEffect } from 'react'
// @ts-ignore
import AOS from 'aos'
import Auth from './Auth/Auth'
import { Toaster } from 'react-hot-toast'
import Registration from './pages/Registration/Registration'

function App() {
  
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
      mirror: true
    })
  }, [])
  

  return (
    <>
      <Toaster toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/how_it_works' element={<HowItWorks/>}/>
        <Route path='/authentication' element={<Auth/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    </>
  )
}

export default App
