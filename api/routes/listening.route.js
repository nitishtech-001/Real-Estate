import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListening,deleteListening, deleteImageUrlListening, updateListening, getListening, getListenings } from "../controllers/listening.controller.js";

const router = express.Router();

router.post("/create",verifyToken,createListening);
router.delete("/delete/:id",verifyToken,deleteListening);
router.delete("/deleteImageUrl/:id",verifyToken,deleteImageUrlListening);
router.post("/update/:id",verifyToken,updateListening);
router.get("/getListening/:id",getListening);
router.get("/get",getListenings);
export default router;