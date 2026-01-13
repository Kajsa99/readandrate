import mysql from "mysql2/promise";

// MySQL connection pool on localhost, matching seed.sql and index.ts
export const database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "secret",
    database: "booksdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log("MySQL pool (localhost) ready.");
