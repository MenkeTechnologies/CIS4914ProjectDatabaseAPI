const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Profile = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  street_address: {
    type: String
  },
  city_address: {
    type: String
  },
  state_address: {
    type: String
  },
  zipcode_address: {
    type: String
  }
});

module.exports = mongoose.model('Profile', Profile);
