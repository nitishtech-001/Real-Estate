import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate("/signin");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return;
    }
  };
  return (
    <div className="bg-gradient-to-b from-slate-300 to-rose-300 min-h-screen w-full pt-20 p-10 xs:20 sm:from-slate-200 sm:to-cyan-200">
      <div className="p-3 max-w-lg mx-auto bg-bgSignup bg-cover bg-center bg-no-repeat rounded-lg ">
        <h1 className="text-4xl text-green-300 text-center font-bold my-7 ">
          Signup
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-w-32 mx-5  gap-4 opacity-75 font-semibold xs:max-w-xs sm:max-w-screen-sm xs:mx-20"
        > 
          <input
            type="text"
            id="username"
            placeholder="user_name"
            className="border p-2 rounded-md sm:rounded-lg sm:p-3 "
            onChange={handleChange}
            required
          />
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
            {loading ? "Loading..." : "Sign up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-3 text-white justify-center mt-5">
          <p>Have an account? </p>
          <Link to="/signin">
            <span className="underline font-bold">Sign in</span>
          </Link>
        </div>
      </div>
      {loading && (
        <p className="text-green-700 text-center font-bold sm:text-green-500">
          Your Registration In process !!
        </p>
      )}
      {error && (
        <p className="text-red-900 text-center font-semibold x">
          Username or Email is already used try different
        </p>
      )}
    </div>
  );
}
