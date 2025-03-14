import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaChair, FaParking } from "react-icons/fa";
export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-2 hover:shadow-lg transition-shadow w-full sm:w-[346px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={`Cover image of ${listing.name}`}
          className="h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
        />
        <h2 className="text-lg font-semibold text-slate-700 truncate mt-3">
          {listing.name}
        </h2>
        <p className="flex items-center gap-1 mt-1">
          <MdLocationOn className="text-2xl text-green-700 -ml-1" />
          <span className="text-gray-600 text-sm capitalize truncate">
            {listing.address}
          </span>
        </p>
        <p className="text-lg text-gray-600 line-clamp-2 my-1">
          Description {": "}
          <span className="text-sm">{listing.description}</span>{" "}
        </p>
        <section className="flex justify-between items-center">
          <section className="flex gap-2 text-sm sm:text-lg">
            Price:
            {listing.offer ? (
              <p className="text-green-600 flex gap-3">
                <span className="line-through">
                  ${listing.regularPrice.toLocaleString("en-US")}
                </span>
                <span>${listing.discountPrice.toLocaleString("en-US")}</span>
              </p>
            ) : (
              <p className="text-lg text-green-600">
                ${listing.regularPrice.toLocaleString("en-US")}
              </p>
            )}
            {listing.type === "rent" ? "/month" : ""}
          </section>
          <span className="font-bold text-blue-700 capitalize">
            For {listing.type}
          </span>
        </section>
        <p className="flex gap-3 text-slate-700 font-bold text-sm my-1 items-center">
          <span>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Beds`
              : `${listing.bedrooms} Bed`}
          </span>
          <span>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Baths`
              : `${listing.bathrooms} Bath`}
          </span>
          {listing.parking && (
            <span className="flex items-center gap-1">
              <FaParking />
              Park
            </span>
          )}
          {listing.furnished && (
            <span className="flex items-center gap-1">
              <FaChair />
              Furnish
            </span>
          )}
        </p>
      </Link>
    </div>
  );
}
