const db = require("../database/queries");

async function indexGet(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages });
}

function newMessageGet(req, res) {
    res.render("new-message-form");
}

async function newMessagePost(req, res) {
    await db.addNewMessage(req.user.id, req.body.title, req.body.message);
    res.redirect("/");
}

module.exports = {
    indexGet,
    newMessageGet,
    newMessagePost
}