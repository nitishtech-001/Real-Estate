import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState({});
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setMessage({ message: e.target.value });
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${listing.userRef}`);
        const data = await res.json();
        if (data.succss === false) {
          console.log(data.message);
          return;
        }
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [listing.userRef]);
  return landlord._id ? (
    <div className="flex flex-col w-full md:text-md lg:text-lg">
      <p className="my-2">
        Contact{" "}
        <span className="text-blue-500 font-semibold">{landlord.username}</span>{" "}
        For
        {"  "}
        <span className="text-blue-700 font-semibold">{listing.name}</span>
      </p>
      <textarea
        className="w-full rounded-md px-3 py-4 border-2 border-black"
        rows={4}
        id="message"
        placeholder="Your message here"
        onChange={handleChange}
      />
      <Link className="bg-slate-700 p-2 text-white text-center uppercase rounded-md hover:opacity-85"
      to={`mailto:${landlord.email}?subject=Interest in ${listing.name}&body=${message}`}>
        sent to owner
      </Link>
    </div>
  ) : (
    <p className="text-red-700 text-md text-center">
      This plot creator does not exit
    </p>
  );
}
