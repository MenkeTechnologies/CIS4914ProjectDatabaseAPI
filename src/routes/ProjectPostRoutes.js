const express = require("express");
const router = express.Router();
const ProjectPost = require('../models/ProjectPost');
const {handleClosure, errorMsg, successMsg, log, logError, AUTHOR} = require("../util/Util");

router.route('/').post((req, res) => ProjectPost.create(req.body, handleClosure(req, res)));
router.route('/').get((req, res) => ProjectPost.find().populate(AUTHOR).exec(handleClosure(req, res)));
router.route('/:id').delete((req, res) => ProjectPost.delete(req.params.id, req.body, handleClosure(req, res)))
router.route('/:id').get((req, res) => ProjectPost.findById(req.params.id, handleClosure(req, res)))
router.route('/:id').patch((req, res) => {
  ProjectPost.findById(req.params.id, (err, post) => {
    if (!post) {
      return res.status(400).send(errorMsg("Project post not found"))
    }

    const updated = {
      ...post, ...req.body
    };

    updated.save().then((data) => {
      res.json(successMsg(data))
    }).catch((e) => {
      logError(e);
      res.status(500).send(errorMsg("Update project post not possible"))
    })

  });
});

module.exports = router
