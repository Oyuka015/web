import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { getUserAddress, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/address", authenticateToken, getUserAddress);
router.put("/profile", authenticateToken, updateUserProfile);

export default router;