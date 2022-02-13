const express = require("express");
const router = express.Router();
let Profile = require('./models/profile.model');
const projectDBUtil = require('../util/projectDBUtil');
const log = projectDBUtil.log;

// Gives all profiles - will use for debugging in Postman but will remove later
router.route('/').get((req, res) => {
  Profile.find((err, profiles) => {
    log.info(req);
    if (err) {
      log.info(err);
    } else {
      res.json(profiles);
    }
  });
});

// Get a specific profile.
router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Profile.findById(id, (err, profile) => {
    res.json(profile);
  });
});

// Add data to a profile for the firs time (may need to be changed based on Mohamed's implementation)
router.route('/register').post((req, res) => {
  let profile = new Profile(req.body);
  profile.save()
    .then(_profile => {
      res.status(200).json(projectDBUtil.successMsg('registration successful'));
    })
    .catch(err => {
      log.error(err)
      res.status(500).send(projectDBUtil.errorMsg('registration failed'));
    });
});

router.route('/edit/:id').post((req, res) => {
  Profile.findById(req.params.id, (err, profile) => {
    if (!profile) {
      return res.status(400).send(projectDBUtil.errorMsg('profile is not found'));
    }
    profile.first_name = req.body.first_name;
    profile.last_name = req.body.last_name;
    profile.username = req.body.username;
    profile.email = req.body.email;
    profile.street_address = req.body.street_address;
    profile.city_address = req.body.city_address;
    profile.state_address = req.body.state_address;
    profile.zipcode = req.body.zipcode;

    profile.save().then(_profile => {
      res.json(projectDBUtil.successMsg('Profile updated'));
    }).catch(_err => {
      log.error(err);
      res.status(500).send(projectDBUtil.errorMsg('Update not possible'));
    });
  });
});

module.exports = router;
