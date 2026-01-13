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

app.get("/books", async (_request, response) => {
    try {
        const [results] = await database.query<Book[]>("SELECT * FROM books");
        response.send(results);
    } catch (err) {
        console.error("Error fetching books:", err);
        response.status(500).send({ error: "Failed to fetch books" });
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

app.listen(3000, () => {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
