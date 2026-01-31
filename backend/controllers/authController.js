import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "tanii_nuuts_tulkhuur";

export async function register(req, res) {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Нэр, имэйл, нууц үг заавал оруулна уу." });
  }
  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Энэ имэйлээр бүртгэлтэй байна." });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email",
      [name, email, password_hash, phone || null, address || null],
    );
    res.json({ message: "Амжилттай бүртгэгдлээ", user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Бүртгэл амжилтгүй: " + err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash,
    );
    if (!validPassword) {
      return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });
    }
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { name: user.rows[0].name, email: user.rows[0].email },
    });
  } catch (err) {
    res.status(500).json({ error: "Серверийн алдаа" });
  }
}


export async function getMe(req, res) {
    try {
        const userQuery = `
            SELECT id, name, email, phone, address, 
            (SELECT COUNT(*) FROM orders WHERE user_id = $1) as order_count,
            (SELECT COUNT(*) FROM saved_foods WHERE user_id = $1) as saved_count
            FROM users WHERE id = $1`;
        
        const user = await pool.query(userQuery, [req.user.id]);
        
        if (user.rows.length === 0) return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Серверийн алдаа" });
    }
}