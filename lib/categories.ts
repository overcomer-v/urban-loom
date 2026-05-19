import pool from "./db";

export async function getCategories() {
  const result = await pool.query(`SELECT * FROM categories`);
  return result.rows;
}
