import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
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

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);  

//creating an middle-ware to handle errors
app.use((err, req, res, next) => {
  const statusCode =err.statusCode || 500;
  const message=err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});
