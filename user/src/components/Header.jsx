import React from "react";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import {useSelector} from 'react-redux';
export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className="block bg-slate-300 sm:bg-slate-200 ">
      <div className=" flex  justify-around items-center p-3 gap-4 sm:max-w-7xl sm:justify-between sm:gap-18 md:max-w-9xl">
        <h1 className="font-bold text-sm sm:text-xl sm:ml-16 md:text-2xl xl:text-3xl flex ">
          <span className="text-slate-500">Nitish</span>
          <span className="text-slate-700 md:mr-10">Estate</span>
        </h1>
        <form className="flex items-center justify-between  min-w-8 max-w-21 bg-slate-100 rounded-md p-1 sm:p-3 sm:rounded-lg sm:max-w-1xl sm:flex-grow md:max-w-2xl " >
          <input
            type="text"
            placeholder="Search ..."
            className="bg-transparent   min-w-4 outline-none capitalize "
          />
          <ImSearch className="text-slate-500 size-4 sm:size-5" />
        </form>
        <ul className="flex items-center xs:gap-5 sm:gap-4  md:gap-6 lg:gap-8 xl:gap-10">
          <Link to="/">
            <li className="font-bold hidden text-slate-700 sm:inline hover:underline pointer hover:text-red-900">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="font-bold hidden text-slate-700 hover:underline pointer  hover:text-red-900 xs:inline">
              About
            </li>
          </Link>
          <Link to="/profile">
          {currentUser ?(
            <img src={currentUser.avatar} alt="user photo"  className="rounded-full h-10 w-10 xs:h-12 xs:w-12  object-cover" title="user photo"/>
          ):
            (<li className="font-bold text-nowrap text-slate-700 hover:underline pointer  hover:text-red-900">
              Sign in
            </li>)
          }
          </Link>
        </ul>
      </div>
    </header>
  );
}
