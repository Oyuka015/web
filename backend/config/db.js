import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: Number(process.env.DB_PORT),
  ssl: false,
});

export default pool;
