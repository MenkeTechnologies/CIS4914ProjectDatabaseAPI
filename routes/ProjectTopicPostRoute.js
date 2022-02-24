let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

let ProjectTopicPostSchema = require('../models/ProjectTopicPost');

router.route('/create-projecttopicpost').post((req, res, next) => {
  ProjectTopicPostSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

router.route('/').get((req, res) => {
  ProjectTopicPostSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;