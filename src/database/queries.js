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
        JOIN users ON user_id = users.id
        ORDER BY time DESC;
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

async function deleteMessage(id) {
    await pool.query(`
        DELETE FROM messages
        WHERE id = $1
        `, [id]);
    console.log("Deleted message with id: " + id);
}

async function addMemberStatus(id) {
    await pool.query(`
        UPDATE users
        SET member_status = TRUE
        WHERE id = $1
        `, [id]);
    console.log("Added membership status to user with id: " + id);
}

async function addAdminStatus(id) {
    await pool.query(`
        UPDATE users
        SET admin_status = TRUE
        WHERE id = $1
        `, [id]);
    console.log("Added admin status to user with id: " + id);
}

module.exports = {
    getUser,
    addNewUser,
    getUserOnId,
    getAllMessages,
    addNewMessage,
    addMemberStatus,
    addAdminStatus,
    deleteMessage
}