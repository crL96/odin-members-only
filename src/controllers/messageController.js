const db = require("../database/queries");
const { body, validationResult } = require("express-validator");

async function indexGet(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages });
}

const validateMessage = [
    body("title").trim()
        .isLength({ min: 1, max: 30 }).withMessage("Title must be between 1 and 30 characters"),
    body("message").trim()
        .isLength({ min: 1, max: 255 }).withMessage("Title must be between 1 and 255 characters"),
    body().custom((value, { req }) => {
        if (req.user) return true;
        return false;
    }).withMessage("Must be signed in to send messages")
];

function newMessageGet(req, res) {
    res.render("new-message-form");
}

const newMessagePost = [
    validateMessage,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("new-message-form", {
                errors: errors.array(),
            });
        }

        await db.addNewMessage(req.user.id, req.body.title, req.body.message);
        res.redirect("/");
    }
];

async function deleteMessagePost(req, res) {
    if (req.user.admin_status) {
        await db.deleteMessage(req.body.messageId);
    }
    res.redirect("/");
}

module.exports = {
    indexGet,
    newMessageGet,
    newMessagePost,
    deleteMessagePost
}