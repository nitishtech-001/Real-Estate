import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import "swiper/css/bundle";
export default function Listing() {
  SwiperCore.use(Navigation);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ error: "", loading: true });
  const params = useParams();
  console.log(formData);
  useEffect(() => {
    const fetchListing = async () => {
      setStatus({ ...status, loading: true });
      try {
        console.log(params.listingId);
        const res = await fetch(
          `/api/listening/getListening/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setStatus({ error: data.message, loading: false });
          return;
        }
        setFormData(data);
        setStatus({ error: "", loading: false });
      } catch (error) {
        setStatus({ error: error.message, loading: false });
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <div className="m-5">
      {status.loading ? "Loading....." : ""}
      {formData._id ? (
        <div>
          <Swiper navigation>
            {formData.imageUrls.map((url,index)=>(
            <SwiperSlide key={index}>
              <div className="h-[500px]" style={{background:`url(${url}) center no-repeat`,backgroundSize: 'cover'}}></div>
            </SwiperSlide>
          ))}
          </Swiper>
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
    </div>
  );
}
