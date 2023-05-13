const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minLength: 4,
    maxLength: 100
  },
  email: {
    type: String,
    required: [true, 'Please provide you email.'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a secure password.'],
    minLength: 4
  }
});

module.exports = mongoose.model('User', UserSchema)