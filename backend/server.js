import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; 
import dotenv from "dotenv";

import categoryRoutes from "./api/category-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ES module дээр __dirname орлуулах
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Static files (SPA)
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);  // categories

// // ================= HOME =================
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ================= REGISTER =================
// app.post("/api/register", async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     const hash = await bcrypt.hash(password, 10);

//     const { rows } = await pool.query(
//       `INSERT INTO users (fullname, email, password_hash, role_id)
//        VALUES ($1, $2, $3, 1)
//        RETURNING id, fullname, email, role_id`,
//       [fullname, email, hash]
//     );

//     res.status(201).json({
//       success: true,
//       user: rows[0],
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ success: false, error: err.message });
//   }
// });

// // ================= LOGIN =================
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const { rows } = await pool.query(
//       "SELECT * FROM users WHERE email=$1",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     const user = rows[0];
//     const valid = await bcrypt.compare(password, user.password_hash);

//     if (!valid) {
//       return res.status(401).json({ error: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, role_id: user.role_id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         fullname: user.fullname,
//         role_id: user.role_id,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



