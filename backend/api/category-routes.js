import express, { json } from "express";
import pool from "../db.js"; // backend-д байгаа болохоор ..

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, name, slug FROM categories ORDER BY id");
    res.json(rows);
    console.log(json(rows));
  } catch (err) {
    console.error(err.message); // console-д алдааг харуулах
    res.status(500).json({ error: err.message });
  }
});

export default router;
