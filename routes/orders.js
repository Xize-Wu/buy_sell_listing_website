const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Orders History route
router.get('/', (req, res) => {
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

module.exports = router;