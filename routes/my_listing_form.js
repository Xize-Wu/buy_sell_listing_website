const express = require('express');
const userQueries = require('../db/queries/users');
// post the form and redirect back to home page and it should show the new product 
// view the posting form
const router = express.Router();

router.get('/myLists', (req, res) => {
  const user_name = req.session.username;
  const templateVars = { username: user_name };
  res.render('my_listing_form', templateVars);
});


router.post('/', (req, res) => {
  const userId = req.session.userId;
  console.log('THIS IS THE SESSION USERID: ', userId);

  if (!userId) {
    return res.redirect('/');
  }

  const newListing = req.body;

  userQueries
    .addListing(userId, newListing)
    .then((products) => {
      res.send(200, { message: 'ok' });
      // res.send(products);
    })
    .catch((error) => {
      console.log(error.message);
      res.send(error);
    });

    res.redirect('/');
});

module.exports = router;