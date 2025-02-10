import React from "react";

export default function Listing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-8 ">
        Create a Listing
      </h1>
      <form className="flex flex-col justify-center items-start gap-5 md:flex-row">
        <div className="min-w-1/2">
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border-gray-300 p-2 rounded-lg w-full"
              minLength="6"
              maxLength="60"
              required
            />
            <textarea
              placeholder="Description"
              className="border-gray-300 p-2 rounded-lg h-14 w-full"
              minLength="10"
              maxLength="60"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border-gray-300 p-2 rounded-lg w-full"
              minLength="10"
              maxLength="60"
              required
            />
            <div className="flex gap-5 flex-wrap">
              {["Sell", "Rent", "Parking", "Furnished", "Offer"].map((item) => (
                <fieldset className="flex gap-2" key={item.toLowerCase()}>
                  <input
                    type="checkbox"
                    name={item.toLowerCase()}
                    id={item.toLowerCase()}
                    className="w-5"
                  />
                  <label htmlFor={item.toLowerCase()}>{item}</label>
                </fieldset>
              ))}
            </div>
          </div>
          <div className="flex gap-5  flex-wrap mt-6">
            {[
              { label: "Beds", id: "beds", min: 1, max: 10 },
              { label: "Baths", id: "baths", min: 1, max: 10 },
              { label: "Regular price", id: "regular-price", unit: "$/month" },
              {
                label: "Discount price",
                id: "discount-price",
                unit: "$/month",
              },
            ].map(({ label, id, min, max, unit }) => (
              <fieldset className="flex gap-2 items-center justify-start" key={id}>
                <label htmlFor={id} className="flex flex-col items-center">
                  <p>{label}</p>
                  {unit && <span className="text-xs">({unit})</span>}
                </label>
                <input
                  type="number"
                  name={id}
                  id={id}
                  className={
                    id === "baths" || id === "beds"
                      ? "border-gray-300 rounded-lg p-2 w-12"
                      : "border-gray-300 rounded-lg p-2 w-28"
                  }
                  min={min}
                  max={max}
                  required
                />
              </fieldset>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 mt-6 mx-auto md:mt-0">
          <p className="font-semibold">Images :
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex">
            <input
              type="file"
              name="house-image"
              id="images"
              className="border-gray-300 rounded-lg p-1 file:cursor-pointer"
              accept="image/*"
              multiple
              required
            />
            <button className="border font-semibold min-w-48 uppercase rounded-lg p-2 bg-slate-300 text-green-600 hover:shadow-lg hover:opacity-90 disabled:opacity-80 md:-ml-20">
              Upload
            </button>
          </div>
          <button className="border font-semibold min-w-64 uppercase rounded-lg p-2 bg-green-600 hover:shadow-lg hover:opacity-90 disabled:opacity-80 md:w-full mt-5">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
