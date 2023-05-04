CREATE DATABASE todoapp;

CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  title VARCHAR(50) NOT NULL,
  progress INTEGER NOT NULL,
  completed BOOLEAN NOT NULL,
  description varchar(300),
  project varchar(300) NOT NULL,
  added_date varchar(300) NOT NULL
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);