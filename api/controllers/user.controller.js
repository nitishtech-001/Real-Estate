import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only change your own Account"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true ,returnDocument: "after"}
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
// initializing the imagekitio
const imagekitConfig = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
// IMAGE_HIT_URL
export const imagekit = (req,res,next)=>{
  const authenticationParameters = imagekitConfig.getAuthenticationParameters();

  res.json(Object.assign(authenticationParameters,{fetchURL : process.env.IMAGE_HIT_URL}));
}
// DELETE user route method
export const deleteUser = async (req,res,next)=>{
  if (req.user.id !== req.params.id){
    return next(errorHandler(403, "You can only delete your own Account"));
  }
  try{
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted successfully!');
  }catch(error){
    next(error)
  }
}
// SIgn out
export const signOut =async (req,res,next)=>{
  try{
    res.clearCookie("access_token");
    res.status(200).json('User has been logged out!');
  }catch(error){
    next(error);
  }
}