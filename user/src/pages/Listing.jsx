import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import { FaBed, FaBath, FaShare, FaParking, FaChair } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Contact from "../components/Contact.jsx";
export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState({});
  const [status, setStatus] = useState({ error: "", loading: true });
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      setStatus({ ...status, loading: true });
      try {
        const res = await fetch(
          `/api/listening/getListening/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setStatus({ error: data.message, loading: false });
          return;
        }
        setListing(data);
        setStatus({ error: "", loading: false });
      } catch (error) {
        setStatus({ error: error.message, loading: false });
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {status.loading ? (
        <h1 className="text-3xl text-center mt-5">Loading.....</h1>
      ) : listing._id ? (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[500px] w-screen"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="max-w-3xl m-5 md:mx-auto "> 
            <h1 className="text-lg font-bold my-5 sm:text-xl md:text-2xl">
              {listing.name} -{" "}
              {listing.discountPrice ? (
                <>
                  <span className="text-blue-600 line-through">
                    ${listing.regularPrice.toLocaleString('en-US')}/month
                  </span>
                  <span className="text-blue-600 ml-5">
                    ${listing.discountPrice.toLocaleString('en-US')}/month
                  </span>
                </>
              ) : (
                <span className="text-blue-600">${listing.regularPrice.toLocaleString('en-US')}</span>
              )}
            </h1>
            <p className="flex gap-2 text-lg items-center sm:text-xl my-2">
              <FontAwesomeIcon icon={faLocationDot} />
              {listing.address}
            </p>
            <p className="text-md font-semibold my-3 max-w-[400px] sm:text-lg md:text-xl text-white">
              {listing.type === "rent" ? (
                <span className="capitalize bg-red-600 rounded-md p-1 w-full ">
                  For {listing.type}
                </span>
              ) : (
                <span className="capitalize bg-green-600 rounded-md p-1 w-full">
                  For {listing.type}
                </span>
              )}
              {listing.offer ? (
                <span className="rounded-md p-1 w-full bg-blue-600 ml-5">
                  Save: {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')}
                </span>
              ) : (
                ""
              )}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-lg text-black">
                Description -{" "}
              </span>{" "}
              {listing.description}
            </p>
            <p className="flex gap-5 text-lg font-semibold my-3 sm:gap-10 flex-wrap">
              <span className="flex gap-2 items-center">
                <FaBed className="text-xl text-blue-500" />
                {listing.bedrooms > 1
                  ? listing.bedrooms + " Beds"
                  : listing.bedrooms + " Bed"}
              </span>
              <span className="flex gap-2 items-center">
                <FaBath className="text-xl text-blue-300" />
                {listing.bathrooms > 1
                  ? listing.bathrooms + " Baths"
                  : listing.bathrooms + " Bath"}
              </span>
              <span className="flex gap-2 items-center ">
                <FaParking
                  className={
                    "text-xl text-green-500" + listing.parking
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
                {listing.parking ? "Parking" : "No-Parking"}
              </span>
              <span className="flex gap-2 items-center ">
                <FaChair
                  className={
                    "text-xl text-green-500" + listing.furnished
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
                {listing.parking ? "Furnished" : "No-Furnished"}
              </span>
            </p>
            {currentUser._id !== listing.userRef && !contact ? (
              <button
                className="bg-slate-700 w-full p-2 text-white uppercase rounded-md hover:opacity-85"
                onClick={() => setContact(true)}
              >
                Contact the owner
              </button>
            ) : (
              ""
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-xl mx-auto mt-32 border-4 p-3 text-center rounded-lg min-w-fit">
          <h1 className="text-3xl text-red-700 font-bold">404</h1>
          <p className="text-lg">
            Oops! The page you're looking for can't be found
          </p>
          <p>
            <Link
              to="/"
              className="text-xl hover:underline text-blue-500 font-semibold"
            >
              Go back to the Home
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
