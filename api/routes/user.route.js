import expresss from "express";
import { updateUser, imagekit,deleteUser, signOut,userListenings} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = expresss.Router();

// upload.single('file') 
router.post("/update/:id", verifyToken, updateUser);
router.get("/imagekit",imagekit);
router.delete("/delete/:id",verifyToken,deleteUser)
router.get("/signOut",signOut)
router.get("/listening/:id",verifyToken,userListenings)
export default router;
