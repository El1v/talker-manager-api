const express = require('express');

const router = express.Router();

const login = require('../login');

router.post('/', login.validateEmail, login.validatePassword, (req, res) => {
  // const user = req.body;
  const token = login.generateToken();
  res.status(200).json({ token });
});

module.exports = router;
