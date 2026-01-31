import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import categoryRoutes from "./api/category-routes.js";
import foodRoutes from "./api/food-routes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes); 
app.use("/api/foods", foodRoutes);  
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
