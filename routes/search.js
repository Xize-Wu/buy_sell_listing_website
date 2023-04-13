const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// search form
router.post('/', (req, res) => {

  userQueries.searchBooksByPrice(req.body)
  .then ((products) => {
      const templateVars = {
        products,
        username: req.session.username
      };
      res.render('product', templateVars);
    })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/', (req, res) => {
  const templateVars = {
    username: req.session.username
  };

  res.render('search', templateVars);
});

module.exports = router;