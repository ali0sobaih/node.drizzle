import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'drizzle',
  password: 'crossroads',
  waitForConnections: true,
});

export const db = drizzle(pool);
export const connectionPool = pool;

