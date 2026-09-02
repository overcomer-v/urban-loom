import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE2_DATABASE_URL,
  ssl: process.env.DATABASE2_DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

export default pool;