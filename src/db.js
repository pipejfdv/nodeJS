import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "skytel.re",
  port: "8099",
  user: "root",
  password: "camila23", // Coloca tu contraseña de MySQL
  database: "velta-inc",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
