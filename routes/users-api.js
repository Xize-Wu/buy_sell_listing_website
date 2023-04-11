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

// Orders History route
router.get('/orders', (req, res) => {
  const user_id = req.session.userId;

  userQueries.getAllOrders(user_id)
  .then(orders => {

    if (!user_id) {
      return res.redirect('/')
    }

    const templateVars = {
      orders,
      username: req.session.username
    }

    res.render('orders', templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })
});

// Favourites page route
router.get('/favourites', (req, res) => {
  const user_id = req.session.userId;

  userQueries.getAllFavourites(user_id)
  .then(favourites => {

    if (!user_id) {
      return res.redirect('/')
    }

    const templateVars = {
      favourites,
      username: req.session.username
    }

    res.render('favourites', templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })
});

// User's Listings route
router.get('/listings', (req, res) => {
  const user_id = req.session.userId;

  userQueries.getAllUSerListings(user_id)
  .then(listings => {

    if (!user_id) {
      return res.redirect('/')
    }

    const templateVars = {
      listings,
      username: req.session.username
    }

    res.render('listings', templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })
});



module.exports = router;