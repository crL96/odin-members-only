const db = require("../database/queries");

function signUpGet(req, res) {
    res.render("sign-up-form");
}

async function signUpPost(req, res) {
    const dbResponse = await db.addNewUser(
        req.body.username, 
        req.body.fullname, 
        req.body.password)
        
    // if username is in use
    if (!dbResponse) {
        res.redirect("/sign-up");
        return;
    }
    res.redirect("/");
}

module.exports = {
    signUpGet,
    signUpPost
}