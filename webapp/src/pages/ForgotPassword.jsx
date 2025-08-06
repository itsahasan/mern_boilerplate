import React, { useState } from 'react'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(e)=>{

  }
  const handleChange = ()=>{
    
  }
  return (
    <div>
      <div className='p-3 max-w-lg mx-auto mt-6'>
        <h1 className='text-2xl font-semibold mb-2 text-center text-gray-800'>Forgot Password ?</h1>
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow- [0px_0px_10px_0px] shadow-black/10">   
            <input id="email" className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required  onChange={handleChange}  />
            <button disabled={loading} type="submit" className="w-full mb-3 bg-slate-700 hover:bg-slate-900 active:scale-95 transition py-2.5 rounded-full text-white">{loading ? 'Loading...':'Send Email'}</button>
        </form> 
      </div>
    </div>

  )
}

export default ForgotPassword