const express = require('express');
const userQueries = require('../db/queries/users');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const router  = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// 2. Create register form
router.post('/',(req, res) => {
  const { name, email, password } = req.body;

  res.send('Registration sucessful');
});



app.post('/register', (req, res) => {
  // extract info
  const { email, password } = req.body;

  // validation => does that user already exist in the userDatabase
  const user = findUserbyEmail(email, usersDatabase);

  if (user) {
    res.status(400).send(`Error 400: Sorry, that user already exists!`);
    return;
  }

  // check if email or password are empty strings => if they are, respond with error code
  if (email === '' || password === '') {
    res.status(400).send(`Error 400: Oops! You left some fields empty. Try again!`);
    return;
  }


  module.exports = router;