import express from "express";
import { createOrder } from "../controllers/orderController.js";
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);
 
router.post("/", createOrder);

export default router;
