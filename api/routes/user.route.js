import expresss from "express";
import { updateUser, imagekit} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = expresss.Router();

// upload.single('file') 
router.post("/update/:id", verifyToken, updateUser);
router.get("/imagekit",imagekit);
export default router;
