const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./authentication/passport");
const indexRouter = require("./routes/indexRoutes");
require("dotenv").config();
const pool = require("./database/pool");


const app = express();

//Handle static assets
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

// EJS templating
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// App middleware
app.use(session({
  store: new (require("connect-pg-simple")(session))({
    pool: pool,
    createTableIfMissing: true
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));

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
