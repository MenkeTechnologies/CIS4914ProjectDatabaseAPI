const express = require("express");
const router = express.Router();
const Message = require('../models/Message');
const {handleClosure, errorMsg, successMsg, log} = require("../util/Util");

router.route('/').post((req, res) => Message.create(req.body, handleClosure(req, res)));
router.route('/').get((req, res) => Message.find(req.body, handleClosure(req, res)))
router.route('/:id').delete((req, res) => Message.delete(req.params.id, req.body, handleClosure(req, res)))
router.route('/:id').get((req, res) => Message.findById(req.params.id, handleClosure(req, res)))
router.route('/:id').patch((req, res) => {
  Message.findById(req.params.id, (err, message) => {
    if (!message) {
      return res.status(400).send(errorMsg("Message not found"))
    }

    const updated = {
      ...message, ...req.body
    };

    updated.save().then((data) => {
      res.json(successMsg(data))
    }).catch((e) => {
      log.error(e);
      res.status(500).send(errorMsg("Update message not possible"))
    })

  });
});

module.exports = router