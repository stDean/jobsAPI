const User = require('../models/user.model');

const authController = {
  register: async (req, res) => {
    res.send("register");
  },
  login: async (req, res) => {
    res.send("register");
  }
}

module.exports = authController