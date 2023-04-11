/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Home route
router.get('/', (req, res) => {
  userQueries.getAllProducts()
    .then(products => {
      console.log("show something", products)
      const templateVars = {
        products,
        username: req.session.username
      };
      res.render('index', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// search form
router.post('/search', (req, res) => {

  const { book_title, minimum_price, maximum_price } = req.body;

  userQueries.searchBooksByPrice(book_title, minimum_price, maximum_price)
  .then ((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })

  // userQueries.searchBookByPrice(title, minimum_price, maximum_price)
  // .then((result) => {
  //   res.redirect('/');
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
});

router.get('/search', (req, res) => {
  res.render('search');
});

module.exports = router;