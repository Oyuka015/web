import express from "express";
import { createOrder,getUserOrders  } from "../controllers/orderController.js";
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);
 
router.post("/", createOrder);
router.get("/my", authenticateToken, getUserOrders);

export default router;
