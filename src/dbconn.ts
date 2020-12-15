import mysql2 from 'mysql2'
 
export const pool = mysql2.createPool({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});