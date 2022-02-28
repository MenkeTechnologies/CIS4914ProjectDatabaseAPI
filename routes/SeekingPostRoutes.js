const express = require('express');
const router = express.Router();
const SeekingPost = require('../models/SeekingPost');
const {handleClosure, errorMsg, successMsg, log, logError} = require("../util/Util");

router.route('/').post((req, res) => SeekingPost.create(req.body, handleClosure(req, res)));
router.route('/').get((req, res) => SeekingPost.find(req.body, handleClosure(req, res)))
router.route('/:id').delete((req, res) => SeekingPost.delete(req.params.id, req.body, handleClosure(req, res)))
router.route('/:id').get((req, res) => SeekingPost.findById(req.params.id, handleClosure(req, res)))
router.route('/:id').patch((req, res) => {
  SeekingPost.findById(req.params.id, (err, post) => {
    if (!post) {
      return res.status(400).send(errorMsg("Seeking post not found"))
    }

    const updated = {
      ...post,
      ...req.body
    };

    updated.save().then((data) => {
      res.json(successMsg(data))
    }).catch((e) => {
      logError(e);
      res.status(500).send(errorMsg("Update seeking post not possible"))
    })

  });
});

module.exports = router;
