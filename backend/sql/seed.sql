-- Create database if it doesn't exist and select it
CREATE DATABASE IF NOT EXISTS booksdb;
USE booksdb;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  aurthor VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  user VARCHAR(100)
);

-- Seed initial data
INSERT INTO users (name, email) VALUES
  ('Greta', 'greta@berg.com'),
  ('Robert', 'gustavsson@berg.com')
ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email);

INSERT INTO books (title, aurthor, rating, comment, user) VALUES
  ('The Pragmatic Programmer', 'Andrew Hunt', 5, 'A classic for developers', 'Greta'),
  ('Clean Code', 'Robert C. Martin', 4, 'Great principles, sometimes opinionated', 'Robert')
ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment), user = VALUES(user);
