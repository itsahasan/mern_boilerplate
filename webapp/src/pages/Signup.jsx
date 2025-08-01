import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='p-3 max-w-lg mx-auto mt-4'>
      <h1 className='text-2xl font-semibold mb-6 text-center text-gray-800'>Sign Up</h1>
      <form className="bg-white text-gray-500 max-w mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow- [0px_0px_10px_0px] shadow-black/10">   

          <input id="email" className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required />
          <input id="password" className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="password" placeholder="Enter your password" required />
          <div className="text-right py-4">
              <a className="text-blue-600 underline" href="#">Forgot Password</a>
          </div>
          <button type="submit" className="w-full mb-3 bg-slate-700 hover:bg-slate-900 active:scale-95 transition py-2.5 rounded-full text-white">Sign Up</button>
          <button type="button" className="w-full flex items-center gap-3 justify-center bg-white border border-gray-500/30 py-2 rounded-full text-gray-800">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                Log in with Google
        </button>
      </form> 
      <p className="text-center">Don’t have an account? <Link to='/signin' className="text-blue-500 underline">Signup in</Link></p>
    </div>
  )
}

export default Signup