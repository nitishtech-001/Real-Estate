import axios from "axios";
import React from "react";
import { useState } from "react";
export default function Listing() {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [file, setFile] = useState(undefined);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(imageUrls);
  console.log(formData);
  const handleImageSubmit = async () => {
    if (file === undefined || file.length === 0) {
      setImageUploadError("Plaese select the image First.");
      return;
    }
    try {
      setImageUploadError(true);
      if (file.length > 6 || (file.length + imageUrls.length) > 6) {
        setImageUploadError("File allowed  Max  : 7 file");
        return;
      }
      let updateImageUrl = [...imageUrls];
      console.log(updateImageUrl)
      for (let f of file) {
        const authResponse = await axios.get("api/user/imagekit");
        const { signature, expire, token, fetchURL } = authResponse.data;
        const formData = new FormData();
        formData.append("file", f);
        formData.append("fileName", f.name);
        formData.append(
          "publicKey",
          import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY
        );
        formData.append("signature", signature);
        formData.append("expire", expire);
        formData.append("token", token);

        const uploadResponse = await axios.post(fetchURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        updateImageUrl.push(uploadResponse.data.url);
      }
      setImageUrls(updateImageUrl);
      setFormData({ ...formData, imageUrls: updateImageUrl });
      setImageUploadError(false);
      setFile(null);
    } catch (error) {
      setImageUploadError("Max image size 2MB");
      console.log("Why error")
      console.log("Upload Error: ", error.response?.data || error.message);
    }
  };
  const handleDeleteImg = (index) => {
    console.log("this is called");
    const updateImageUrl = [];
    for (let i = 0; i < imageUrls.length; i++) {
      if (i === index) {
        continue;
      } else {
        updateImageUrl.push(imageUrls[i]);
      }
    }
    setImageUrls(updateImageUrl);
    setFormData({ ...formData, imageUrls: updateImageUrl });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto overflow-visible">
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
              <fieldset
                className="flex gap-2 items-center justify-start"
                key={id}
              >
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
        <div className="flex flex-col items-center justify-center gap-5 mx-auto md:mt-0">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-col gap-5 md:gap-2 justify-center sm:flex-row">
            <input
              onChange={(e) => setFile(e.target.files)}
              type="file"
              name="house-images"
              id="images"
              className="border-gray-300 rounded-lg p-1 file:cursor-pointer border"
              accept="image/*"
              multiple
              required
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="border font-semibold uppercase rounded-lg p-2 bg-slate-300 text-green-600 hover:shadow-lg hover:opacity-90 disabled:opacity-80 "
            >
              {imageUploadError === true ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 -mt-2">
            {imageUploadError ? imageUploadError : ""}
          </p>
          <div className="">
            {imageUrls.map((items, index) => (
              <fieldset
                key={index}
                className=" flex justify-between p-3 gap-32 items-center border rounded-md w-96"
              >
                <img
                  src={items}
                  alt={items.slice(1, 10)}
                  className="w-40 h-28 object-contain"
                />
                <p
                  onClick={() => handleDeleteImg(index)}
                  className="text-white font-semibold hover:cursor-pointer border p-2 rounded-lg bg-red-500"
                >
                  Delete
                </p>
              </fieldset>
            ))}
          </div>

          <button
            type="submit"
            className="border font-semibold min-w-full uppercase rounded-lg p-2 bg-green-600 hover:shadow-lg hover:opacity-90 disabled:opacity-80 "
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
