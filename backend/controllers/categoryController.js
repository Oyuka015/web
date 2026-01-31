import pool from "../config/db.js";

export async function getAllCategories(req, res) {
  try {
    const { rows } = await pool.query("SELECT id, name, slug FROM categories ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
