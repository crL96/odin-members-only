# Members only

## Description
This project is part of the TOP curriculum, a project made to test knowledge of authentication/passport.js, node, express, SQL/postgres, server-side programming and debugging.

Link to project instructions: https://www.theodinproject.com/lessons/node-path-nodejs-members-only

A web app where users can register and send messages/create posts. Only registered users can send messages, but only those who are members can see the names of others. A user can also be given admin priviliges that allows them to delete messages.

Users are authenticated with PassportJS and passwords are handled with bcrypt.

## Getting Started
Live build: https://members-only-crl96.onrender.com

#### Run locally
Clone the repository

Navigate to the project directory: cd odin-members-only

Install packages with: npm install

Setup a PostgreSQL database and add it's credentials to the .env in the next step.

Create a .env file in the project root directory, look at the .env.example for clarification.

Populate your database with the neccessary tables by running: node src/database/populatedb.js

Preview the website: npm run start

Navigate to http://localhost:3000/

## Technologies Used
Programming Languages: Javascript, HTML/EJS, CSS, SQL

Server-side Tools: NodeJS, Express, PassportJS, Bcrypt, PostgreSQL