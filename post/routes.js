const express = require("express");
const router = express.Router();
const Post = require("./models/post.model");
const User = require("../login/models/user.model");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require("express-validator");
const vntUtil = require("../util/vntUtil");
const {authMiddleware} = require("../util/vntUtil");
const mongoose = require("mongoose");

router.post("/create", authMiddleware, (req, res) => {
  console.log("Create called.");

  const {
    firstName,
    lastInitial,
    assignedVolunteer,
    // postId,
    description,
    category,
    // thumbnailType,
    city,
    state,
    completionStatus,
    completionDate,
  } = req.body;

  console.log(req.user.email);

  User.findOne({email: req.user.email}).then((email) => {
    console.log("Find one initiated");
    let user_email = email.email;
    console.log(user_email);
    if (!email) {
      errors.push({msg: "Not a registered user"});
      console.log("User mismatch");
      return res.status(400).json(errors);
    } else {
      const newPost = new Post({
        email: user_email,
        firstName,
        lastInitial,
        assignedVolunteer,
        // postId,
        description,
        category,
        // thumbnailType,
        city,
        state,
        completionStatus,
        completionDate,
      });
      console.log(newPost);

      //From here you can take the newPost object and send to Database
      newPost
        .save()
        .then((post) => {
          res.send("post saved to database");
        })
        .catch((err) => {
          res.status(400).send(`unable to save to database ${err}`);
        });
    }
  });
});

router.get("/", (req, res) => {
  console.log("Get all posts called.");
  Post.find({}).then(
    posts => {
      return res.status(200).send(posts);
    }).catch(err => res.status(400).send(`unable to save to database ${err}`));
});

router.get("/my_posts", authMiddleware, (req, res) => {
  console.log("Get all users' posts called.");
  Post.find({"email": req.user.email}).then(
    posts => {
      return res.status(200).send(posts);
    }).catch(err => res.status(400).send(`unable to save to database ${err}`));
});

router.post("/volunteer/", authMiddleware, (req, res) => {
  console.log("Update Post called.");
  Post.findById(req.body.id).then(
    post => {
      User.findOne({email: req.user.email}).then(user => {
        post.assignedVolunteer = user.name;

        post.save().then(() => {
          return res.send("User assigned as volunteer");
        });
      });
    }).catch(err => res.status(400).send(`unable to set as volunteer ${err}`));
});

module.exports = router;
