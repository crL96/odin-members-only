const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function addNewUser(username, fullname, password) {
    // Check if username is in use
    const existingUsername = await getUser(username);
    if (existingUsername) return false;

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(`
        INSERT INTO users (username, fullname, hashed_password)
        VALUES ($1, $2, $3);
        `, [username, fullname, hashedPassword]);
    console.log("Added new user to database");
    return true;
}

module.exports = {
    getUser,
    addNewUser
}