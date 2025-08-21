import React, {  useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useAuthStore} from '../store/authStore'
import Input from '../components/Input'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'




const Signup = () => {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate();
  const { signup, error, isLoading} = useAuthStore()

  const handleSubmit = async (e) => {
  e.preventDefault();

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
 
    try {
      await signup(name, email, password)
      navigate("/verify-email")
      
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto mt-6'>
      <h1 className='text-2xl font-semibold mb-2 text-center text-gray-800'>Sign Up</h1>
      <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow- [0px_0px_10px_0px] shadow-black/10">   

          <Input
						type='text'
            required
						placeholder='Enter your username'
						ref={nameRef}
					/>
          <Input
						type='email'
            required
						placeholder='Enter your email'
						ref={emailRef}
					/>

          <Input
						type='password'
            required
						placeholder='Enter your password'
						ref={passwordRef}
					/>
         
          <div className="text-right py-4">
              <Link to='/forgetpassword' className="text-blue-600 underline">Forgot Password</Link>
          </div>
          <button type="submit" className="w-full mb-3 bg-slate-700 hover:bg-slate-900 active:scale-95 transition py-2.5 rounded-full text-white">{isLoading ? 'Loading...':'Sign Up'}</button>
          <button type="button" className="w-full flex items-onClick(handel) center gap-3 justify-center bg-white border border-gray-500/30 py-2 rounded-full text-gray-800">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                Log in with Google
        </button>
      </form> 
     

      <p className="text-center">Have an account? <Link to='/signin' className="text-blue-500 underline">Signup in</Link></p>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup