import pool from "../config/db.js";

export async function getUserAddress(req, res) {
  try {
    const userID = req.user?.id;

    if (!userID) {
      console.error("User ID байхгүй байна:", req.user);
      return res.status(401).json({ error: "Нэвтрэх эрх шаардлагатай." });
    }

    // console.log("Хаяг шалгаж байна, userID:", userID);

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