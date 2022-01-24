const express = require("express");
const router = express.Router();
let Profile = require('./models/profile.model');
const vntUtil = require('../util/vntUtil');

// Gives all profiles - will use for debugging in Postman but will remove later
router.route('/').get(function (req, res) {
  Profile.find(function (err, profiles) {
    console.log(req);
    if (err) {
      console.log(err);
    } else {
      res.json(profiles);
    }
  });
});

// Get a specific profile.
router.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Profile.findById(id, function (err, profile) {
    res.json(profile);
  });
});

// Add data to a profile for the firs time (may need to be changed based on Mohamed's implementation)
router.route('/register').post(function (req, res) {
  let profile = new Profile(req.body);
  profile.save()
    .then(profile => {
      res.status(200).json(vntUtil.successMsg('registration successful'));
    })
    .catch(err => {
      res.status(500).send(vntUtil.errorMsg('registration failed'));
    });
});


// Edit existing profile data
router.route('/edit/:id').post(function (req, res) {
  Profile.findById(req.params.id, function (err, profile) {
    if (!profile) {
      return res.status(400).send(vntUtil.errorMsg('profile is not found'));
    }
    profile.first_name = req.body.first_name;
    profile.last_name = req.body.last_name;
    profile.username = req.body.username;
    profile.email = req.body.email;
    profile.street_address = req.body.street_address;
    profile.city_address = req.body.city_address;
    profile.state_address = req.body.state_address;
    profile.zipcode = req.body.zipcode;

    profile.save().then(profile => {
      res.json(vntUtil.successMsg('Profile updated'));
    }).catch(err => {
      res.status(500).send(vntUtil.errorMsg('Update not possible'));
    });
  });
});

module.exports = router;
