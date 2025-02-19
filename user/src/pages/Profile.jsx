import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateMsg, setUpdateMsg] = useState("");
  const [showListing, setShowListing] = useState({
    success: false,
    loading: false,
    error: "",
  });
  const [userListing, setUserListing] = useState([]);
  const [imageChange,setImageChange] = useState(true);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      console.log(formData);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setUpdateMsg("Your credential change successfully!");
    } catch (err) {
      dispatch(updateFailure(err.message));
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = async (file) => {
    try {
      const authResponse = await axios.get("api/user/imagekit");
      const { signature, expire, token, fetchURL } = authResponse.data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("token", token);

      const uploadResponse = await axios.post(fetchURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const profileImgURL = uploadResponse.data.url;
      //setting to the formData
      setFormData({ ...formData, avatar: profileImgURL });
    } catch (error) {
      console.log("Upload Error: ", error.response?.data || error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateMsg(data);
    } catch (error) {
      console.log("error");
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleShowListing = async () => {
    try {
      setShowListing({ success: false, loading: true, error: "" });
      const res = await fetch(`api/user/listening/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListing({ success: false, loading: false, error: data.message });
        return;
      }
      setShowListing({ success: true, loading: false, error: "" });
      setUserListing(data);
    } catch (error) {
      setShowListing({ success: false, loading: false, error: error });
    }
  };
  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listening/delete/${listingId}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      console.log(data);
      setUserListing([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteImageUrlListing = async (listingId, deleteIndex,objIndex) => {
    try {
      setImageChange(false);
      const res = await fetch(`/api/listening/deleteImageUrl/${listingId}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({deleteIndex: deleteIndex}),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return;
      }
      if(data.imageUrls){
        userListing.splice(objIndex,1,data);
      }else{
        userListing.splice(objIndex,1);
      }
      setUserListing(userListing);
      setImageChange(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col p-3  mx-auto min-w-xl max-w-lg xs:max-w-xs sm:max-w-xl ">
      <h1 className="text-3xl font-bold text-center my-7 ">Profile</h1>
      <form
        className="flex flex-col gap-3 w-full min-w-32 font-semibold"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar ? formData.avatar : currentUser.avatar}
          alt="user photo"
          title="profile photo"
          className="w-24 h-24 rounded-full self-center object-cover mt-2 sm:w-24 sm:h-24 cursor-pointer"
          crossOrigin="anonymous"
        />
        <input
          type="text"
          id="username"
          placeholder={currentUser.username}
          defaultValue={currentUser.username}
          className="border p-2 rounded-md sm:rounded-lg sm:p-3 "
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder={currentUser.email}
          defaultValue={currentUser.email}
          className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter password to change"
          className="border p-2 rounded-md sm:p-3 sm:rounded-lg"
          autoComplete="additional-name"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white  font-bold uppercase hover:opacity-80 disabled:opacity-70 p-2 rounded-md sm:p-3 sm:rounded-lg">
          Update
        </button>
        <Link
          to="/create-listening"
          className="bg-green-700 text-white  text-center font-bold uppercase hover:opacity-80 disabled:opacity-70 p-2 rounded-md sm:p-3 sm:rounded-lg"
        >
          Create Listening
        </Link>
      </form>
      <div className="flex justify-between w-full text-red-700 mt-5">
        <span onClick={handleDeleteUser} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateMsg ? updateMsg : ""}</p>
      <button
        onClick={handleShowListing}
        className="text-white uppercase border h-10 w-36 mx-auto font-semibold hover:opacity-90 bg-green-600 rounded-lg"
      >
        {showListing.loading ? "Just A Minute....." : "Show Listings"}
      </button>
      { imageChange && userListing.map((listing,objIndex) => (
        <div key={listing._id} className="">
          <h1 className="text-center text-2xl my-5 font-semibold">
            Your Listings
          </h1>
          <div className="flex justify-evenly my-5 items-center">
            <p>
              Create Date :{" "}
              <span className="text-nowrap">
                {listing.createdAt.slice(0, 10)}
              </span>
            </p>
            <button
              onClick={() => handleDeleteListing(listing._id)}
              className="bg-red-700 text-white md:h-8 rounded-md px-1 hover:opacity-70 uppercase text-wrap mx-5"
            >
              Delete Listing
            </button>
            <p>
              Update At :{" "}
              <span className="text-nowrap">
                {listing.updatedAt.slice(0, 10)}
              </span>
            </p>
          </div>
          {listing.imageUrls.map((url, index) => (
            <div
              key={index}
              className="flex justify-between items-center border mt-5 p-2"
            >
              <Link to={`/listening/${listing._id}`}>
                <img
                  src={url}
                  alt={listing.description}
                  key={index}
                  className="h-20 w-32 object-contain"
                />
              </Link>
              <Link to={`/listening/${listing._id}`}>
                <p className="hover:underline truncate">{listing.name}</p>
              </Link>
              <div className="flex flex-col gap-2 w-24">
                <button
                  onClick={() =>
                    handleDeleteImageUrlListing(listing._id, index,objIndex)
                  }
                  className="bg-red-700 text-white h-8 rounded-md px-1 hover:opacity-70 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`} className="bg-blue-700 text-white h-8 rounded-md  hover:opacity-70 text-center">
                <button className="uppercase pt-1">
                  Edit
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
