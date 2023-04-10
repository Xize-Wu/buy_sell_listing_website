const express = require('express');
const userQueries = require('../db/queries/users');
// const cookieParser = require('cookie-parser');
// USE cookiesession
// USE bcrypt

const router  = express.Router();

// router.use(cookieParser());

// Log a user in
router.post('/', (req, res) => {

  const { email, password } = req.body;

  const value = req.body.user

  userQueries.getUserWithEmail(email)
  .then((user) => {

  })
});

//Login GET route
router.get('/', (req, res) => {
  res.render('login', req);
});

module.exports = router;