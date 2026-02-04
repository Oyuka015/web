import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid"; // order_number үүсгэх

export const createOrder = async (req, res) => {
  const { items, deliveryType, deliveryFee, total, notes } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // order_number үүсгэх
    const orderNumber = uuidv4();

    // Orders table-д нэмэх
    const orderInsert = `
      INSERT INTO orders (user_id, order_number, total_amount, status, delivery_type, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const orderRes = await client.query(orderInsert, [
      userId,
      orderNumber,
      total,
      "pending",
      deliveryType,
      notes || null
    ]);

    const orderId = orderRes.rows[0].id;

    // order_items table-д нэмэх
    const orderItemInsert = `
      INSERT INTO order_items (order_id, food_id, quantity, unit_price, subtotal)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const item of items) {
      const subtotal = item.price * item.quantity;

      await client.query(orderItemInsert, [
        orderId,
        item.id,
        item.quantity,
        item.price,
        subtotal
      ]);
    }

    const deleteCartItems = `DELETE FROM cart_items WHERE user_id = $1`;
    await client.query(deleteCartItems, [userId]);

    await client.query("COMMIT");

    res.status(201).json({ message: "Order created successfully", orderId, orderNumber });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  } finally {
    client.release();
  }
};
