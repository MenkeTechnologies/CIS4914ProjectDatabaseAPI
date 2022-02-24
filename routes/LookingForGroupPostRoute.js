let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let LookingForGroupPostSchema = require('../models/LookingForGroupPost');

// CREATE Project Topic Post
router.route('/create-lookingforgrouppost').post((req, res, next) => {
    LookingForGroupPostSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    LookingForGroupPostSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;