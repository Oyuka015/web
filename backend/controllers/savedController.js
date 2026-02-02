// backend/controllers/saved.controller.js
import pool from "../config/db.js";

// 1️⃣ Хадгалсан бүх хоолыг авах
export async function getSavedFoods(req, res) {
  try {
    const userId = req.user.id; // authenticateToken middleware-аар request-д нэмэгдсэн

    const queryText = `
      SELECT f.id, f.name, f.description, f.price, f.image_url AS image, f.rating
      FROM saved_foods sf
      JOIN foods f ON sf.food_id = f.id
      WHERE sf.user_id = $1
      ORDER BY sf.created_at DESC
    `;

    const { rows } = await pool.query(queryText, [userId]);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// 2️⃣ Хоол хадгалах
export async function addToSaved(req, res) {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    const queryText = `
      INSERT INTO saved_foods(user_id, food_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `;

    await pool.query(queryText, [userId, foodId]);

    res.json({ success: true, message: "Food added to saved items" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// 3️⃣ Хоол хадгалахаас устгах
export async function removeFromSaved(req, res) {
  try {
    const userId = req.user?.id;
    const { foodId } = req.params;

    if (!userId || !foodId) {
      return res.status(400).json({ success: false, error: "UserId эсвэл foodId алга" });
    }

    const queryText = `
      DELETE FROM saved_foods
      WHERE user_id = $1 AND food_id = $2
    `;

    await pool.query(queryText, [userId, foodId]);

    res.json({ success: true, message: "Food removed from saved items" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

