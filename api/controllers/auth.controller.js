import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req,res)=>{
    const {username,email,password}=req.body;
    const hashPassword =bcryptjs.hashSync(password,14);
    const user=new User({
        username:username,
        email:email,
        password:hashPassword
    });
    await user.save().then(()=>{
        res.status(201).json({
            message:"User created successfully"
        });
    }).catch((err)=>{
        res.status(500).json({
            message:err.message || "Something went wrong"
        });
    });
};