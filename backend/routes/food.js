import express from "express";
import { getFoods} from "../controllers/foodController.js";

const router = express.Router();

router.get("/", getFoods); 
// router.get("/category/:id", getFoodsByCategory);

export default router;
