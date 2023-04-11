const express = require('express');
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

const router = express.Router();

// 2. Post register form
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  userQueries.getUserWithEmail(email)
    .then((result) => {

      if (result) {
        res.status(400).send(`Error 400: Sorry, that user already exists!`);
        return;
      }

      // Create a new user in the database when they register
      userQueries.storeUserInformation(name, email, bcrypt.hashSync(password, 10))
        .then((result) => {
          req.session.username = result.rows[0].name;
          req.session.userId = result.rows[0].id;
          res.redirect('/');
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Display the register page
router.get('/', (req, res) => {
  const user_name = req.session.username;

  if (user_name) {
    return res.render('/');
  }

  const templateVars = { username: user_name };

  res.render('register', templateVars);
});



module.exports = router;