const express = require('express');
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

const router = express.Router();

// 1. Log a user in
router.post('/', (req, res) => {
  const { email, password } = req.body;

  userQueries.getUserWithEmail(email)
    .then((result) => {

      if (result === undefined) {
        console.log(`Error: User doesn't exist`);
        res.status(400).send("Error: User doesn't exist");
        return;
      }

      const samePassword = bcrypt.compareSync(password, result.password);
      if (!samePassword) {
        console.log(`Error: Password doesn't match`);
        res.status(400).send("Error: Password doesn't match");
        return;
      }
      req.session.username = result.name;
      req.session.userId = result.id;
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error.messxage);
    });
});

//Login GET route
router.get('/', (req, res) => {
  const user_name = req.session.username;

  if (user_name) {
    return res.render('/');
  }

  const templateVars = { username: user_name };

  res.render('login', templateVars);
});

module.exports = router;