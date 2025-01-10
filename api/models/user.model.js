import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type :String,
        default :"https://cdn.pixabay.com/photo/2022/11/18/17/04/monster-7600565_640.jpg",
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;