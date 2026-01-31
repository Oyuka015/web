import express from "express";
import { getAllFoods, getFoodsByCategory } from "../controllers/foodController.js";

const router = express.Router();

// Бүх хоол
router.get("/", getAllFoods);

// Тухайн category-ийн хоол
router.get("/category/:id", getFoodsByCategory);

export default router;
