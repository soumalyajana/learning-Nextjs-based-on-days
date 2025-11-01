const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB connection immediately
pool.connect()
  .then(() => console.log("🟢 PostgreSQL connected successfully"))
  .catch(err => console.error("❌ Error connecting to PostgreSQL:", err));

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (e) {
    console.error("Database query error:", e);
    throw e;
  }
}

module.exports = { query };
