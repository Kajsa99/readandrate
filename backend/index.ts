import express from "express";
import cors from "cors";
import type { RowDataPacket } from "mysql2";
import { database } from "./database.ts";

const app = express();
app.use(cors());
app.use(express.json());

interface Book extends RowDataPacket {
    id?: number;
    title: string;
    aurthor: string;
    rating: number;
    comment: string;
    user?: string;
}

app.get("/", (_request, response) => {
    response.send("Hello Babygirl!");
});

app.get("/health", async (_request, response) => {
    try {
        await database.query("SELECT 1");
        response.status(200).send({ status: "ok" });
    } catch (err) {
        console.error("Database health check failed:", err);
        response.status(500).send({ status: "error" });
    }
});

app.get("/books", async (_request, response) => {
    try {
        const [results] = await database.query<Book[]>("SELECT * FROM books");
        response.send(results);
    } catch (err) {
        console.error("Error fetching books:", err);
        response.status(500).send({ error: "Failed to fetch books" });
    }
});

app.post("/books", async (request, response) => {
    try {
        const { title, aurthor, rating, comment, user } = request.body;
        await database.query(
            "INSERT INTO books (title, aurthor, rating, comment, user) VALUES (?, ?, ?, ?, ?)",
            [title, aurthor, rating, comment, user || null],
        );
        response.status(201).send({ message: "Book added" });
    } catch (err) {
        console.error("Error adding book:", err);
        response.status(500).send({ error: "Failed to add book" });
    }
});

interface User extends RowDataPacket {
    id?: number;
    name: string;
    email: string | null;
}

app.get("/users", async (_request, response) => {
    try {
        const [results] = await database.query<User[]>("SELECT * FROM users");
        response.send(results);
    } catch (err) {
        console.error("Error fetching users:", err);
        response.status(500).send({ error: "Failed to fetch users" });
    }
});

app.post("/users", async (request, response) => {
    try {
        const { name, email } = request.body;
        await database.query("INSERT INTO users (name, email) VALUES (?, ?)", [
            name,
            email || null,
        ]);
        response.status(201).send({ message: "User added" });
    } catch (err) {
        console.error("Error adding user:", err);
        response.status(500).send({ error: "Failed to add user" });
    }
});

app.listen(3000, () => {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
