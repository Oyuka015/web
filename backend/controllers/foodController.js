import pool from "../config/db.js";

// /api/foods?category=<slug>&search=<text>
export async function getFoods(req, res) {
  try {
    const { category, search } = req.query;

    // Base query
    let baseQuery = `
      SELECT 
        f.id, f.name, f.description, f.price, f.image_url, f.rating,
        c.id AS category_id, c.name AS category_name
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let i = 1; //param index

    // category-r filter
    if (category && category !== "all") {
      baseQuery += ` AND c.id = $${i}`; // herew slug ashiglah bol : c.slug = $${i}
      params.push(category);
      i++;
    }

    // search-r 
    if (search) {
      baseQuery += ` AND (f.name ILIKE $${i} OR f.description ILIKE $${i})`;
      params.push(`%${search}%`);
      i++;
    }

    baseQuery += " ORDER BY f.id";

    const { rows } = await pool.query(baseQuery, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
