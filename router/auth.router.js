const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { login, register } = authController;

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;