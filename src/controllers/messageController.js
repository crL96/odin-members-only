const db = require("../database/queries");

async function indexGet(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages });
}

function newMessageGet(req, res) {
    res.render("new-message-form");
}

module.exports = {
    indexGet,
    newMessageGet
}