const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function getUserOnId(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

async function addNewUser(username, fullname, password) {
    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(`
        INSERT INTO users (username, fullname, hashed_password)
        VALUES ($1, $2, $3);
        `, [username, fullname, hashedPassword]);
    console.log("Added new user to database");
}

async function getAllMessages() {
    const { rows } = await pool.query(`
        SELECT messages.id as id, title, message, username, fullname, time
        FROM messages
        JOIN users ON user_id = users.id;
        `);
    return rows;
}

async function addNewMessage(userId, title, message) {
    await pool.query(`
        INSERT INTO messages (user_id, title, message)
        VALUES ($1, $2, $3);
        `, [userId, title, message]);
    console.log("Added new message to database");
}

module.exports = {
    getUser,
    addNewUser,
    getUserOnId,
    getAllMessages,
    addNewMessage
}