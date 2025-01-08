import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice";


export default function Signin() {
  const navigate = useNavigate();
  const {loading, error} =useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [showError,setShowError] =useState(false);
  const dispatch =useDispatch();
  const handleChange = (e) => {
    setShowError(false);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setShowError(true);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      setShowError(true);
      dispatch(signInFailure(err.message));
      return;
    }
  };
  return (
    <div className="bg-gradient-to-b from-slate-300 to-rose-300 min-h-screen w-full pt-20 p-10 xs:20 sm:from-slate-200 sm:to-cyan-200">
      <div className="p-3 max-w-lg mx-auto bg-bgSignup bg-cover bg-center bg-no-repeat rounded-lg ">
        <h1 className="text-4xl text-green-300 text-center font-bold my-7 ">
          Signin
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-w-32 mx-5  gap-4 opacity-75 font-semibold xs:max-w-xs sm:max-w-screen-sm xs:mx-20"
        >
          <input
            type="email"
            id="email"
            placeholder="email@gmail.com"
            className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="strong password"
            className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
            onChange={handleChange}
            required
          />
          <button className="bg-cyan-400 text-white  font-bold uppercase hover:opacity-80 disabled:opacity-70 p-2 rounded-md sm:p-3 sm:rounded-lg">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-3 text-white justify-center mt-5">
          <p>Don't have account ? </p>
          <Link to="/signup">
            <span className="underline font-bold">Sign up</span>
          </Link>
        </div>
      </div>
      {loading && (
        <p className="text-green-700 text-center font-bold sm:text-green-500">
          Your Login In process !!
        </p>
      )}
      {showError && <p className="text-red-900 text-center font-semibold x">
          {error}
        </p>
        }
    </div>
  );
}
