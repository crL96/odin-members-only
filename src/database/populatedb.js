#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();


const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  fullname VARCHAR ( 255 ),
  hashed_password VARCHAR ( 255 ),
  member_status BOOLEAN DEFAULT FALSE,
  admin_status BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  message VARCHAR ( 255 ),
  title VARCHAR ( 30 ),
  time TIMESTAMP ( 0 ) DEFAULT now()
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
