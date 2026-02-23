import { readFile } from "fs/promises";
import mysql from "mysql2/promise";
import { dbConfig } from "./database.ts";

async function run() {
    const sqlPath = new URL("./sql/seed.sql", import.meta.url);
    const sql = await readFile(sqlPath, "utf8");

    // Use the same host/port/user/password as the app, but omit `database`
    // so that seed.sql can CREATE DATABASE + USE it on first run.
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
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
