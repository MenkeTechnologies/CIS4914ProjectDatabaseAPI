const express = require("express");
const router = express.Router();
const Post = require("./models/post.model");
const User = require("../login/models/user.model");
const {authMiddleware, errorMsg, log, logError} = require("../../util/Util");

router.post("/create", authMiddleware, (req, res) => {
  log.info("Create called.");

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

  log.info(req.user.email);

  User.findOne({email: req.user.email}).then((email) => {
    log.info("Find one initiated");
    let user_email = email.email;
    log.info(user_email);
    if (!email) {
      log.info("User mismatch");
      return res.status(400).json(errorMsg("Not a registered user"));
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
      log.info(newPost);

      newPost
        .save()
        .then((_post) => {
          res.send("post saved to database");
        })
        .catch((err) => {
          logError(err)
          res.status(400).send(errorMsg(`unable to save to database ${err}`));
        });
    }
  });
});

router.get("/", (req, res) => {
  log.info("Get all posts called.");
  Post.find({}).then(
    posts => {
      return res.status(200).send(posts);
    }).catch(err => {
    logError(err)
    return res.status(400).send(errorMsg(`unable to save to database ${err}`));
  });
});

router.get("/my_posts", authMiddleware, (req, res) => {
  log.info("Get all users' posts called.");
  Post.find({"email": req.user.email}).then(
    posts => {
      return res.status(200).send(posts);
    }).catch(err => {
    logError(err)
    return res.status(400).send(errorMsg(`unable to save to database ${err}`));
  });
});

router.post("/volunteer/", authMiddleware, (req, res) => {
  log.info("Update Post called.");
  Post.findById(req.body.id).then(
    post => {
      User.findOne({email: req.user.email}).then(user => {
        post.assignedVolunteer = user.name;

        post.save().then(() => {
          return res.send("User assigned as volunteer");
        });
      });
    }).catch(err => {
      logError(err);
      res.status(400).send(errorMsg(`unable to set as volunteer ${err}`
      ))
    }
  )
  ;
});

module.exports = router;
