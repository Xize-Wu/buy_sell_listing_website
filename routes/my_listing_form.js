const express = require('express');
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

// the info inputted by user is coming through as strings in req.body. Some of them are integers
// post the form and redirect back to home page and it should show the new product on home page

// view the posting form
const router = express.Router();
router.get('/myLists', (req, res) => {
  const user_name = req.session.username;
  const templateVars = { username: user_name };
  res.render('my_listing_form', templateVars);
});

router.post("/", (req, res) => {
  console.log('req.body', req.body)
  const userId = req.session.userId;
  const newListing = req.body;

  userQueries
    .addListing(userId, newListing)
    .then((newListing) => {

      res.redirect("/");
    })
    .catch((error) => {
      console.error(error.message);
      res.send(error);
    }); 
});


module.exports = router;