import { readFile } from "fs/promises";
import mysql from "mysql2/promise";

async function run() {
    const sqlPath = new URL("./sql/seed.sql", import.meta.url);
    const sql = await readFile(sqlPath, "utf8");

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "secret",
        multipleStatements: true,
    });

    try {
        await connection.query(sql);
        console.log("Seed executed successfully.");
    } finally {
        await connection.end();
    }
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
