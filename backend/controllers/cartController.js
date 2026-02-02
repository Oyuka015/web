import pool from "../config/db.js";

// GET /api/cart
export async function getCartFoods(req, res) {
  try {
    const userId = req.user.id;

    const query = `
      SELECT ci.food_id, f.name, f.price, f.image_url, ci.quantity
      FROM cart_items ci
      JOIN foods f ON ci.food_id = f.id
      WHERE ci.user_id = $1
    `;

    const { rows } = await pool.query(query, [userId]);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// POST /api/cart/:foodId
export async function addCartFood(req, res) {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    // Хэрвээ аль хэдийн cart-д байвал quantity-г 1 нэмнэ
    const checkQuery = `
      SELECT quantity FROM cart_items WHERE user_id = $1 AND food_id = $2
    `;
    const checkResult = await pool.query(checkQuery, [userId, foodId]);

    if (checkResult.rows.length > 0) {
      const newQty = checkResult.rows[0].quantity + 1;
      await pool.query(
        `UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND food_id = $3`,
        [newQty, userId, foodId]
      );
    } else {
      await pool.query(
        `INSERT INTO cart_items (user_id, food_id, quantity, added_at) VALUES ($1, $2, 1, NOW())`,
        [userId, foodId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// DELETE /api/cart/:foodId
export async function removeCartFood(req, res) {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    await pool.query(
      `DELETE FROM cart_items WHERE user_id = $1 AND food_id = $2`,
      [userId, foodId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// PUT /api/cart/:foodId
export async function updateCartQuantity(req, res) {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      // quantity 0 бол устгах
      await pool.query(
        `DELETE FROM cart_items WHERE user_id = $1 AND food_id = $2`,
        [userId, foodId]
      );
    } else {
      await pool.query(
        `UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND food_id = $3`,
        [quantity, userId, foodId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
