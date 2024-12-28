import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
//inisializing dotenv
dotenv.config();

//connect to db
mongoose.connect(process.env.MONGO)
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

app.use("/api/user",userRoute);