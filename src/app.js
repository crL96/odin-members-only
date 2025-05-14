const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./authentication/passport");
const indexRouter = require("./routes/indexRoutes");
require("dotenv").config();


const app = express();

// EJS templating
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// App middleware
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => { // If signed in, store user in currentUser variable so all ejs can access it
  res.locals.currentUser = req.user;
  next();
});


// Router
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("app listening on port " + PORT));
