const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require("../database/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
        try {
            const message = "Incorrect username and/or password"

            const user = await db.getUser(username)
            if (!user) {
                return done(null, false, { message: message });
            }
            const match = await bcrypt.compare(password, user.hashed_password);
            if (!match) {
                return done(null, false, { message: message });
            }
            return done(null, user);
        }
        catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserOnId(id);

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;