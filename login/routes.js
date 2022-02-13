const express = require("express");
const router = express.Router();
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');
const projectDBUtil = require('../util/projectDBUtil');
const log = projectDBUtil.log;


router.post('/auth', body('email').isEmail(), body('password').isLength({min: 5}), (req, res) => {

  const validationResult1 = validationResult(req);
  if (!validationResult1.isEmpty()) {
    return res.status(400).json(projectDBUtil.errorMsg(validationResult1.array()));
  }
  const email = req.body.email;
  const password = req.body.password;

  log.info(req.body);

  User.findOne({email})
    .then((user) => {
      if (!user) {
        return res.status(401).json(projectDBUtil.errorMsg('That email is not registered'));
      }
      // Match password
      bcrypt.compare(password, user.password, (err, isMatched) => {
        if (err) throw err;
        if (isMatched) {
          const token = projectDBUtil.createToken(email);
          return res.status(200).json(token);
        } else {
          return res.status(401).json(projectDBUtil.errorMsg('Password incorrect.'));
        }
      });
    })
    .catch((err) => {
      log.error(err)
      return res.status(500).send(projectDBUtil.errorMsg("user find failure."));
    });
})


// Registeration handler
router.post("/register", body('email').isEmail(), body('password').isLength({min: 5}), (req, res) => {
  log.info(req.body);

  const validationResult1 = validationResult(req);
  if (!validationResult1.isEmpty()) {
    return res.status(400).json(projectDBUtil.errorMsg(validationResult1.array()));
  }

  const {name, email, password, password2} = req.body;

  log.info(name);

  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push(projectDBUtil.errorMsg("Please fill all fields"));
  }
  if (password !== password2) {
    errors.push(projectDBUtil.errorMsg("Passwords do not match"));
  }
  const pass = String(password);
  if (pass.length < 6) {
    errors.push(projectDBUtil.errorMsg("Password should be at least 6 characters"));
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  } else {
    User.findOne({email}).then((user) => {
      log.info("Find one initiated");
      log.info(user);
      if (user) {
        errors.push({msg: "User is already registered"});
        log.info("Dupe user");
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            log.info("Inside bcrypt");
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((_user) => {
                const token = projectDBUtil.createToken(email);
                return res.status(200).json(token);
              })
              .catch((err) => {
                log.error(err)
                return res.status(500).send(err);
              });
          })
        );
      }
    });
  }
});

module.exports = router;
