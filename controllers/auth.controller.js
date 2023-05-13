const { StatusCodes } = require('http-status-codes')

const User = require('../models/user.model');

const authController = {
  register: async (req, res) => {
    const user = await User.create({ ...req.body });
    const { name } = user;

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ name, token });
  },
  login: async (req, res) => {
    res.send("You are logged in!");
  }
}

module.exports = authController