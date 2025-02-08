import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const { currentUser, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateMsg,setUpdateMsg] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      console.log(formData)
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
        return ;
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
  const handleFileUpload = async () => {
    try {
      const authResponse = await axios.get("api/user/imagekit");
      const { signature, expire, token, fetchURL } = authResponse.data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", "public_uePe6aseysV1evspiEd9STbTQU0=");
      formData.append("signature",signature);
      formData.append("expire",expire);
      formData.append("token",token);

      const uploadResponse = await axios.post(fetchURL,formData,{
        headers:{
          "Content-Type" : "multipart/form-data",
        }
      });
      const profileImgURL = uploadResponse.data.url;
      //setting to the formData
      setFormData({...formData,avatar :profileImgURL});
    } catch (error) {
      console.log("Upload Error: ", error.response?.data || error.message);
    }
  };
  const handleDeleteUser = async ()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`,{
        method : "DELETE",
        headers : {
          "Content-type" : "application/json",
        }
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data));
        return ;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateMsg(data)
    }catch(error){
      console.log("error")
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut =async ()=>{
    try{
      const res = await fetch("/api/user/signOut");
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return  ;
      }
      dispatch(deleteUserSuccess(data))
    }catch(error){
      dispatch(deleteUserFailure(error));
    }
  }
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
          src={formData.avatar?formData.avatar:currentUser.avatar}
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
      </form>
      <div className="flex justify-between w-full text-red-700 mt-5">
        <span onClick={handleDeleteUser} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateMsg? updateMsg : ""}</p>
    </div>
  );
}
