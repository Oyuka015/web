const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db"); // DB холболт
 
const app = express();
app.use(cors());
app.use(express.json());
 
// Static files serve хийх
app.use(express.static(path.join(__dirname, "public")));
 
// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
 
// API: Categories
app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM categories ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});