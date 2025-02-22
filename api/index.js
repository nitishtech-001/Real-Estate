import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import listiningRoute from "./routes/listening.route.js";
import cookieParser from "cookie-parser";
import path from 'path';
//inisializing dotenv
dotenv.config();

//connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDb Database sussecfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb Database", err);
  });

const __dirname = path.resolve()
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listening", listiningRoute);

app.use(express.static(path.join(__dirname,'/user/dist')));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"user","dist","index.html"));
})
//creating an middle-ware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
