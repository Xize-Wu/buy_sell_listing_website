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
})

module.exports = router;