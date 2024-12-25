import React from 'react'
import {Link} from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
export default function Header() {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-evenly items-center mx-auto p-3 gap-14 sm:max-w-7xl">
      <h1 className='font-bold text-sm sm:text-xl md:text-2xl xl:text-3xl flex'>
        <span className="text-slate-500">Nitish</span>
        <span className="text-slate-700 ">Estate</span>
      </h1>
      <form className='flex items-center justify-between flex-grow  bg-slate-100 rounded-md p-1 sm:p-3  max-w-65 sm:rounded-lg'>
        <input type="text" placeholder='Search ...' className='bg-transparent   outline-none capitalize '/>
        <ImSearch className='text-slate-500 size-5'/>
      </form>
      <ul className='flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10'>
        <Link to="/">
        <li className='font-bold hidden text-slate-700 sm:inline hover:underline pointer hover:text-red-900'>Home</li>
        </Link>
        <Link to="/about">
        <li className='font-bold hidden  text-slate-700 sm:inline hover:underline pointer  hover:text-red-900'>About</li>
        </Link>
        <Link to="/sign-in">
        <li className='font-bold text-nowrap text-slate-700 hover:underline pointer  hover:text-red-900'>Sign-in</li>
        </Link>
        
      </ul>
      </div>
    </header>
  )
}
