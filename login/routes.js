const express = require("express");
const router = express.Router();
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');
const vntUtil = require('../util/vntUtil');


// Login User
// router.get("/login", (req, res) => res.render("login"));
//
// // Registering User
// router.get("/register", (req, res) => res.render("register"));

// Dashboard
// router.get("/dashboard", )

router.post('/auth', body('email').isEmail(), body('password').isLength({min: 5}), (req, res) => {

  const validationResult1 = validationResult(req);
  if (!validationResult1.isEmpty()) {
    return res.status(400).json(vntUtil.errorMsg(validationResult1.array()));
  }


  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);

  User.findOne({email: email})
    .then((user) => {
      if (!user) {
        return res.status(401).json(vntUtil.errorMsg('That email is not registered'));
      }
      // Match password
      bcrypt.compare(password, user.password, (err, isMatched) => {
        if (err) throw err;
        if (isMatched) {
          const token = vntUtil.createToken(email);
          return res.status(200).json(token);
        } else {
          return res.status(401).json(vntUtil.errorMsg('Password incorrect.'));
        }
      });
    })
    .catch((err) => res.status(500).send(vntUtil.errorMsg("user find failure.")));
})


// Registeration handler
router.post("/register", body('email').isEmail(), body('password').isLength({min: 5}), (req, res) => {
  console.log(req.body);

  const validationResult1 = validationResult(req);
  if (!validationResult1.isEmpty()) {
    return res.status(400).json(vntUtil.errorMsg(validationResult1.array()));
  }

  const {name, email, password, password2} = req.body;

  console.log(name);

  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push(vntUtil.errorMsg("Please fill all fields"));
  }
  if (password !== password2) {
    errors.push(vntUtil.errorMsg("Passwords do not match"));
  }
  const pass = String(password);
  if (pass.length < 6) {
    errors.push(vntUtil.errorMsg("Password should be at least 6 characters"));
  }

  if (errors.length > 0) {

    return res.status(400).json(errors);

  } else {
    // if the validation is successful
    User.findOne({email: email}).then((user) => {
      console.log("Find one initiated");
      console.log(user);
      if (user) {
        errors.push({msg: "User is already registered"});
        console.log("Dupe user");
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hashing the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            console.log("Inside bcrypt");
            if (err) throw err;
            newUser.password = hash;
            // Save the user to Mongodb
            newUser
              .save()
              .then((user) => {
                const token = vntUtil.createToken(email);
                return res.status(200).json(token);
              })
              .catch((err) => res.status(500).send(err));
          })
        );
      }
    });
  }
});

module.exports = router;
