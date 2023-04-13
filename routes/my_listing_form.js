const express = require('express');
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');
// view the posting form
const router = express.Router();

router.get('/myLists', (req, res) => {
  const user_name = req.session.username;
  const templateVars = { username: user_name };
  res.render('my_listing_form', templateVars);
});


router.post("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newListing = req.body;
  newListing.user_id = userId;
  userQueries
    .addListing(newListing)
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;