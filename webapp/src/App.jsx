import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import NoPage from './pages/NoPage'
import Header from './components/Header'
import Forgetpassword from './pages/ForgotPassword'
import EmailVerification from './pages/EmailVerification'
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/verify-email' element={<EmailVerification />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgetpassword' element={<Forgetpassword />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App