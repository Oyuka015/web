import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = `
      SELECT 
        f.id, f.name, f.description, f.price, f.image_url, f.rating, f.delivery_time,
        c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon,
        r.name AS restaurant_name, r.id AS restaurant_id
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
      LEFT JOIN restaurants r ON f.restaurant_id = r.id
      WHERE 1=1
    `;

    const values = [];

    if (category) {
      values.push(category);
      query += ` AND c.id = $${values.length}`;
    }

    if (search) {
      values.push(`%${search}%`);
      query += ` AND f.name ILIKE $${values.length}`;
    }

    query += ` ORDER BY f.id DESC`;

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error("Foods error:", err);
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});

export default router;
