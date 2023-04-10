const express = require('express');
const userQueries = require('../db/queries/users');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const router  = express.Router();
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// 2. Post register form
router.post('/',(req, res) => {
  const { name, email, password } = req.body;
  
  userQueries.getUserWithEmail(email)
  .then((result) => {

    if (result) {
      res.status(400).send(`Error 400: Sorry, that user already exists!`);
      return;
    }

    // if (email === '' || password === '') {
    //   res.status(400).send(`Error 400: You left some fields empty. Try again!`);
    //   return;
    // }

    // Create a new user in the database when they register
    userQueries.storeUserInformation(name, email, password)
    .then((result) => {
      req.session.user_id = result.id;
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    })
  })
  .catch((error) => {
    console.log(error.message);
  })
});

// Display the register page
router.get('/', (req, res) => {


  res.render('register', req)
})

module.exports = router;