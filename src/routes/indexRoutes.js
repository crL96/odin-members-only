const router = require("express").Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const passport = require("../authentication/passport");

router.get("/", messageController.indexGet);

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

router.get("/sign-in", userController.signInGet);
router.post("/sign-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureMessage: true
}));

router.get("/new-message", messageController.newMessageGet);
router.post("/new-message", messageController.newMessagePost);

router.get("/member", userController.memberFormGet);
router.post("/member", userController.memberFormPost);

router.get("/add-admin", userController.adminFormGet);
router.post("/add-admin", userController.adminFormPost);

router.post("/delete-message", messageController.deleteMessagePost);

router.get("/sign-out", userController.signOut);

router.get("/profile", (req, res) => res.render("profile"));

module.exports = router;