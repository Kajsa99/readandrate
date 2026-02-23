import "dotenv/config";
import mysql from "mysql2/promise";

// Centralized DB configuration used by both the app and the seed script
export const dbConfig = {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "secret",
    database: process.env.DB_NAME ?? "booksdb",
} as const;

// Create a reusable connection pool. Does not throw until used.
export const database = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Optional: ping once on startup for clearer diagnostics (non-fatal).
void (async () => {
    try {
        await database.query("SELECT 1");
        console.log(
            `MySQL pool ready on ${dbConfig.host}:${dbConfig.port} → ${dbConfig.database}`,
        );
    } catch (error) {
        console.error(
            `Database ping failed. Is MySQL running on ${dbConfig.host}:${dbConfig.port}?`,
            error,
        );
    }
})();
