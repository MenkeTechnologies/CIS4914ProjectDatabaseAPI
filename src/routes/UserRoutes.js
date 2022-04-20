/**
 * @file User CRUD Routes
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {handleClosure, errorMsg, successMsg, log, logError} = require("../util/Util");

const crypto = require('crypto');

router.route('/').get((req, res) => User.find({}, handleClosure(req, res)))
router.route('/').post((req, res) => {
  req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  User.create(req.body, handleClosure(req, res));
});
router.route('/search').post((req, res) => {
  if (req.body.password) {
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  }
  User.find(req.body, handleClosure(req, res));
})
router.route('/:id').delete((req, res) => User.delete(req.params.id, req.body, handleClosure(req, res)))
router.route('/:id').get((req, res) => User.findById(req.params.id, handleClosure(req, res)))
router.route('/:id').patch((req, res) => {
  User.findById(req.params.id, (err, post) => {
    if (!post) {
      return res.status(400).send(errorMsg("User not found"))
    }

    const updated = {
      ...post,
      ...req.body
    };


    updated.save().then((data) => {
      res.json(successMsg(data))
    }).catch((e) => {
      logError(e);
      res.status(500).send(errorMsg("Update user not possible"))
    })

  });
});

module.exports = router;
