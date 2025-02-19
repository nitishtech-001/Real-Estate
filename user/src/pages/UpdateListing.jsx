import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [imageUpload, setImageUpload] = useState({ error: "", loading: false });
  const [file, setFile] = useState(undefined);
  const [submitStatus, setSubmitStatus] = useState({
    error: "",
    loading: false,
    success: false,
  });
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 30,
    discountPrice: 20,
    offer: false,
    parking: false,
    furnished: false,
    userRef: currentUser._id,
  });
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `/api/listening/getListening/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          console.log("something Wrong ", data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListing();
  }, []);
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: "" });
    if (formData.imageUrls.length < 1) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "You must Upload atleast 1 file!",
      });
      return;
    }
    if (+formData.regularPrice < +formData.discountPrice) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Regular price must be greater than Discount price",
      });
      return;
    }
    try {
      const res = await fetch(`/api/listening/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setSubmitStatus({
          loading: false,
          success: false,
          error: data.message,
        });
        return;
      }
      console.log(data);
      setSubmitStatus({ loading: false, success: true, error: "" });
      navigate(`/listening/${data._id}`);
    } catch (err) {
      setSubmitStatus({ loading: false, success: fasle, error: err.message });
    }
  };
  const handleImageSubmit = async () => {
    if (file === undefined || file.length === 0) {
      setImageUpload({
        error: "Plaese select the image First.",
        loading: false,
      });
      return;
    }
    try {
      setImageUpload({error: "",loading: true});
      if (file.length > 6 || file.length + formData.imageUrls.length > 6) {
        setImageUpload({error : "File allowed  Max  : 7 file",loading : false});
        return;
      }
      let updateImageUrl = [...formData.imageUrls];
      for (let f of file) {
        const authResponse = await axios.get("/api/user/imagekit");
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
      setFormData({ ...formData, imageUrls: updateImageUrl });
      setImageUpload({error : "",loading : false});
      setFile(null);
    } catch (error) {
      setImageUpload("Max image size 2MB");
      console.log("Upload Error: ", error.response?.data || error.message);
    }
  };
  const handleDeleteImg = (index) => {
    formData.imageUrls.splice(index, 1);
    console.log(formData.imageUrls);
    setFormData({ ...formData });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto overflow-visible">
      <h1 className="text-3xl font-semibold text-center my-8 ">
        Update a Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 md:flex-row md:items-start"
      >
        <div className="min-w-1/2">
          <div className="flex flex-col items-center gap-4">
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="border-gray-300 p-2 rounded-lg w-full"
              minLength="6"
              maxLength="60"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              id="description"
              placeholder="Description"
              className="border-gray-300 p-2 rounded-lg h-14 w-full"
              minLength="10"
              maxLength="60"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              id="address"
              type="text"
              placeholder="Address"
              className="border-gray-300 p-2 rounded-lg w-full"
              minLength="10"
              maxLength="60"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-5 flex-wrap">
              {["Sale", "Rent"].map((item) => (
                <fieldset className="flex gap-2" key={item.toLowerCase()}>
                  <input
                    type="checkbox"
                    name={item.toLowerCase()}
                    id={item.toLowerCase()}
                    className="w-5"
                    onChange={handleChange}
                    checked={item.toLowerCase() === formData.type}
                  />
                  <label htmlFor={item.toLowerCase()}>{item}</label>
                </fieldset>
              ))}
              {["Parking", "Furnished", "Offer"].map((item) => (
                <fieldset className="flex gap-2" key={item.toLowerCase()}>
                  <input
                    type="checkbox"
                    name={item.toLowerCase()}
                    id={item.toLowerCase()}
                    className="w-5"
                    onChange={handleChange}
                    checked={formData[item.toLowerCase()]}
                  />
                  <label htmlFor={item.toLowerCase()}>{item}</label>
                </fieldset>
              ))}
            </div>
          </div>
          <div className="flex gap-5  flex-wrap mt-6">
            {[
              { label: "beds", id: "bedrooms", min: 1, max: 10 },
              { label: "baths", id: "bathrooms", min: 1, max: 10 },
              {
                label: "Regular price",
                id: "regularPrice",
                min: 30,
                max: 100000,
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
                    id === "bathrooms" || id === "bedrooms"
                      ? "border-gray-300 rounded-lg p-2 w-12"
                      : "border-gray-300 rounded-lg p-2 w-28"
                  }
                  min={min}
                  max={max}
                  required
                  onChange={handleChange}
                  value={formData[id]}
                />
              </fieldset>
            ))}
            {formData.offer && (
              <fieldset className="flex gap-2 items-center justify-start">
                <label
                  htmlFor="discountPrice"
                  className="flex flex-col items-center"
                >
                  <p>Discount price</p>
                  <span className="text-xs">($/month)</span>
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  className="border-gray-300 rounded-lg p-2 w-28"
                  min="20"
                  max="100000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
              </fieldset>
            )}
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
              {imageUpload.loading? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 -mt-2">
            {imageUpload.error ? imageUpload.error : ""}
          </p>
          <div className="">
            {formData.imageUrls.map((items, index) => (
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
            {submitStatus.loading ? "Listening....." : "Update listing"}
          </button>
          <p className="text-red-700">
            {submitStatus.error ? submitStatus.error : ""}
          </p>
          <p className="text-green-700">
            {submitStatus.loading ? "Listining created successfully!" : ""}
          </p>
        </div>
      </form>
    </main>
  );
}
