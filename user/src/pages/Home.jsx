import React, { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
export default function Home() {
  SwiperCore.use(Navigation);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          "/api/listening/get?offer=true&sort=createdAt&order=desc&limit=4"
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          "/api/listening/get?type=rent&sort=createdAt&order=desc&limit=4"
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          "/api/listening/get?type=sale&sort=createdAt&order=desc&limit=4"
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <div className="m-5">
      {/* Top */}
      <div className="mt-20 sm:mt-28 lg:mt-40 md:max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          Find Your next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm my-4">
          Nitish estates is the best place to find your next home
          <br />
          We have wild range of properties for you to choose from.
        </div>
        <Link
          to={`/search?`}
          className="text-blue-500 text-sm font-semibold hover:underline"
        >
          Let's get startted...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation className="my-10 rounded-md">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px] w-screen"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing result for sale and rent */}
      <div className="flex flex-col gap-5">
        <section>
        <h2 className="text-xl font-bold text-gray-800">Recent Offers</h2>
        <Link to={'/search?offer=true'} className="text-blue-700 hover:underline">Show more offers</Link>
        </section>
        <div className="flex gap-5 flex-wrap">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        <section>
        <h2 className="text-xl font-bold text-gray-800">Recent House For Rent</h2>
        <Link to={'/search?type=rent'} className="text-blue-700 hover:underline">Show more rent house</Link>
        </section>
        <div className="flex gap-5 flex-wrap">
          {rentListings &&
            rentListings.length > 0 &&
            rentListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        <section>
        <h2 className="text-xl font-bold text-gray-800">Recent House For Sale</h2>
        <Link to={'/search?type=sale'} className="text-blue-700 hover:underline">Show more sale house</Link>
        </section>
        <div className="flex gap-5 flex-wrap">
          {saleListings &&
            saleListings.length > 0 &&
            saleListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
