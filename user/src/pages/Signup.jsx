import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="bg-gradient-to-b from-slate-300 to-rose-300 min-h-screen w-full pt-20 p-10 xs:20 sm:from-slate-200 sm:to-cyan-200">    
    <div className="p-3 max-w-lg mx-auto bg-bgSignup bg-cover bg-center bg-no-repeat rounded-lg ">
      <h1 className="text-4xl text-green-300 text-center font-bold my-7 ">Signup</h1>
     {/* min-w-8 max-w-21 bg-slate-100 rounded-md p-1 sm:p-3 sm:rounded-lg sm:max-w-1xl sm:flex-grow md:max-w-2xl */}
      <form className="flex flex-col min-w-32 mx-5  gap-4 opacity-75 font-semibold xs:max-w-xs sm:max-w-screen-sm xs:mx-20">
        <input type="text" id="username" placeholder='name_001' className="border p-2 rounded-md sm:rounded-lg sm:p-3"/>
        <input type="email" id='email' placeholder='email@gmail.com' className="border p-2 rounded-md sm:p-3 sm:rounded-lg"/>
        <input type="password" id="password" placeholder="strong password" className="border p-2 rounded-md sm:p-3 sm:rounded-lg"/>
        <button className="bg-cyan-400 text-white  font-bold uppercase hover:opacity-80 disabled:opacity-70 p-2 rounded-md sm:p-3 sm:rounded-lg">Sign up</button>
      </form>
      <div className="flex gap-3 text-white justify-center mt-5">
        <p>Have an account? </p>
        <Link to="/signin">
          <span className="underline font-bold">Sign in</span>
        </Link>
      </div>
    </div>
    </div>
  )
}
