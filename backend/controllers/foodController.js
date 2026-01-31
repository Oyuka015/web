import pool from "../config/db.js";

// Бүх хоолыг буцаах
export async function getAllFoods(req, res) {
  try {
    const { rows } = await pool.query(`
      SELECT 
        f.id, f.name, f.description, f.price, f.image_url, f.rating,
        c.id AS category_id, c.name AS category_name
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
      ORDER BY f.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Тухайн category-ийн хоолыг буцаах
export async function getFoodsByCategory(req, res) {
  const categoryId = req.params.id;
  try {
    const { rows } = await pool.query(`
      SELECT 
        f.id, f.name, f.description, f.price, f.image_url AS image, f.rating,
        c.id AS category_id, c.name AS category_name
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
      WHERE f.category_id = $1
      ORDER BY f.id
    `, [categoryId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
