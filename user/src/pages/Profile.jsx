import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col p-3  mx-auto min-w-xl max-w-lg xs:max-w-xs sm:max-w-xl ">
      <h1 className="text-3xl font-bold text-center my-7 ">Profile</h1>
      <form 
        className="flex flex-col gap-3 w-full min-w-32 font-semibold"
        >
        <img
          src={currentUser.avatar || currentUser.rest.avatar}
          alt="user photo"
          title="profile photo"
          className="w-18 h-20 rounded-full self-center object-cover mt-2 sm:w-24 sm:h-24"
        />
        <input
          type="text"
          id="username"
          placeholder="user_name"
          className="border p-2 rounded-md sm:rounded-lg sm:p-3 "
          required
        />
        <input
          type="email"
          id="email"
          placeholder="email@gmail.com"
          className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
          required
        />
        <input
          type="password"
          id="password"
          placeholder="strong password"
          className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
          required
        />
        <button className="bg-slate-700 text-white  font-bold uppercase hover:opacity-80 disabled:opacity-70 p-2 rounded-md sm:p-3 sm:rounded-lg">
          Update
        </button>
      </form>
      <div className="flex justify-between w-full text-red-700 mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign out</span>
        </div>
    </div>
  );
}
