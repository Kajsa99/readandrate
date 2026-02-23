# Backend

Express + MySQL backend for the book review app.

## Setup

First start MySQL with Docker:
```bash
docker start readandrate-mysql
```

If you don't have the container yet:
```bash
docker run --name readandrate-mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=booksdb -p 3308:3306 -d mysql:8
```

Create a `.env` file:
```
DB_HOST=127.0.0.1
DB_PORT=3308
DB_USER=root
DB_PASSWORD=secret
DB_NAME=booksdb
```

Install and seed the database:
```bash
npm install
npm run seed
```

Start the server:
```bash
npm run dev
```

Server runs on http://localhost:3000

## Routes
- `GET /` - hello message
- `GET /health` - check if database works
- `GET /books` - get all books
- `GET /users` - get all users
