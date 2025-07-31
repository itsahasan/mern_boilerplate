import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className='px-6 py-3 md:py-4 shadow  w-full bg-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={'/'}>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to={'/'}>
            <li className='hover:text-indigo-600'>Home</li>
          </Link>
          <Link to={'/about'}>
            <li className='hover:text-indigo-600'>About</li>
          </Link>
          <Link to={'/signin'}>
            <li className='hover:text-indigo-600'>Signin</li>
          </Link>
        </ul>
      </div>

    </header>
    
    </>
  )
}

export default Header