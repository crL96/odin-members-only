const router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require("../authentication/passport");

router.get("/", (req, res) => res.render("index"));

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

router.get("/sign-in", userController.signInGet);
router.post("/sign-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureMessage: true
}));

module.exports = router;