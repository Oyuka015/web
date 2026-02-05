import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid"; 

export const createOrder = async (req, res) => {
  const { items, deliveryType, deliveryFee, total, notes } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderNumber = uuidv4();

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


export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT 
        o.id, o.order_number, o.total_amount, o.status, o.created_at,
        oi.quantity, oi.unit_price, oi.subtotal,
        f.name as food_name, 
        f.image_url as food_image  -- Энд image-ийг image_url болгов
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN foods f ON oi.food_id = f.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `;

    const { rows } = await pool.query(query, [userId]);

    // Танд байгаа reduce логик хэвээрээ үлдэнэ, учир нь 
    // дээрх query-д бид 'as food_image' гэж alias өгсөн байгаа.
    const orders = rows.reduce((acc, row) => {
      const order = acc.find(o => o.id === row.id);
      const item = {
        name: row.food_name,
        image: row.food_image, // SQL-ийн alias-аас утгаа авна
        quantity: row.quantity,
        price: row.unit_price,
        subtotal: row.subtotal
      };

      if (order) {
        order.items.push(item);
      } else {
        acc.push({
          id: row.id,
          order_number: row.order_number,
          total_amount: row.total_amount,
          status: row.status,
          created_at: row.created_at,
          items: [item]
        });
      }
      return acc;
    }, []);

    res.json(orders);
  } catch (err) {
    console.error("getUserOrders error:", err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};