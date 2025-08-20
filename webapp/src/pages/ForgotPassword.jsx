import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({})

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
      
    //navigate('/verify');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  return (
    <div>
      <div className='p-3 max-w-lg mx-auto mt-6'>
        <h1 className='text-2xl font-semibold mb-2 text-center text-gray-800'>Forgot Password ?</h1>
        <p className="text-center">Enter your email we will send you a reset password link to your email.</p>
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow- [0px_0px_10px_0px] shadow-black/10">   
            <input id="email" className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4" type="email" placeholder="Enter your email" required  onChange={handleChange}  />
            <button disabled={loading} type="submit" className="w-full mb-3 bg-slate-700 hover:bg-slate-900 active:scale-95 transition py-2.5 rounded-full text-white">{loading ? 'Loading...':'Send Email'}</button>
        </form> 
        <p className="text-center">Have an account? <Link to='/signin' className="text-blue-500 underline">Signup in</Link></p>
      </div>
    </div>

  )
}

export default ForgotPassword