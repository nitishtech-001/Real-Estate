import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListining } from "../controllers/listening.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createListining);

export default router;