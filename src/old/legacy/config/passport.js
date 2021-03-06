const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Model
const User = require("../../models/user.model");
const {logError} = require("../../../util/Util");
module.exports = passport => {
  passport.use(
    new localStrategy({usernameField: "email"}, (email, password, done) => {
      // Check if user exists
      User.findOne({email})
        .then((user) => {
          if (!user) {
            return done(null, false, {message: "That email is not registered"});
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (err) throw err;
            if (isMatched) {
              return done(null, user);
            } else {
              return done(null, false, {message: "Password incorrect"});
            }
          });
        })
        .catch((err) => logError(err));
    })
  );

  // passport serilizing and unserilizing
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
