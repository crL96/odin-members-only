const passport = require("../authentication/passport");
const db = require("../database/queries");
const { body, validationResult } = require("express-validator");


function signInGet(req, res) {
    res.render("sign-in-form", { errorMessage: req.session.messages });
    req.session.messages = undefined;
}

function signUpGet(req, res) {
    res.render("sign-up-form");
}

const validateUser = [
    body("username").trim()
        .isAlphanumeric().withMessage("Username must be alpha-numeric (only numbers and letters")
        .isLength({ min: 1, max: 25 }).withMessage("Username must be between 1 and 25 characters")
        //Check if username already is in use
        .custom(async (value) => {
            const exisitingUser = await db.getUser(value);
            if (exisitingUser) throw new Error("Username is already in use")
        }).withMessage("Username is already in use"),
    body("fullname").trim()
        .isAlpha("en-US", { ignore:" " }).withMessage("Full name can only include letter (no numbers or special characters)")
        .isLength( { min: 1, max: 35 }).withMessage("Full name must be between 1 and 35 characters"),
    body("password").trim()
        .isLength({ min: 1, max: 25 }).withMessage("Password must be between 1 and 25 characters"),
    body("confPassword").trim()
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage("Confirm password and password must match")
]

const signUpPost = [
    validateUser,

    async (req, res) => {
        //Check if validation passed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up-form", {
                errors: errors.array(),
            });
        }

        await db.addNewUser(
            req.body.username, 
            req.body.fullname, 
            req.body.password)

        res.redirect("/");
    }
]

module.exports = {
    signUpGet,
    signUpPost,
    signInGet
}