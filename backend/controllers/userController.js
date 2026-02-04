import pool from "../config/db.js";

export async function getUserAddress(req, res) {
  try {
    const userID = req.user?.id;

    if (!userID) {
      console.error("User ID байхгүй байна:", req.user);
      return res.status(401).json({ error: "Нэвтрэх эрх шаардлагатай." });
    }

    const result = await pool.query("SELECT address FROM users WHERE id = $1", [
      userID,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    const address = result.rows[0].address;

    res.json({
      address:
        address === null || address === undefined
          ? null
          : String(address).trim(),
    });
  } catch (err) {
    console.error("getUserAddress алдаа:", err);
    res.status(500).json({ error: "Серверийн алдаа" });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const userID = req.user?.id;

    if (!userID) {
      console.error("User ID байхгүй байна:", req.user);
      return res.status(401).json({ error: "Нэвтрэх эрх шаардлагатай." });
    }

    const { name, email, phone, address } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Нэр шаардлагатай." });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Имэйл шаардлагатай." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Имэйл буруу форматтай байна." });
    }

    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email.trim(), userID]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна." });
    }

    const updateQuery = `
      UPDATE users 
      SET 
        name = $1,
        email = $2,
        phone = $3,
        address = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, name, email, phone, address, created_at, updated_at
    `;

    const result = await pool.query(updateQuery, [
      name.trim(),
      email.trim(),
      phone ? phone.trim() : null,
      address ? address.trim() : null,
      userID
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    const updatedUser = result.rows[0];

    res.json({
      message: "Профайл амжилттай шинэчлэгдлээ",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at
      }
    });
  } catch (err) {
    console.error("updateUserProfile алдаа:", err);
    res.status(500).json({ error: "Серверийн алдаа гарлаа" });
  }
}