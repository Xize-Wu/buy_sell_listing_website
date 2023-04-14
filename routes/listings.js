
const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// User's Listings route
router.get('/', (req, res) => {
  const user_id = req.session.userId;

  userQueries.getAllUSerListings(user_id)
  .then(listings => {

    if (!user_id) {
      return res.redirect('/')
    }

    const templateVars = {
      listings,
      username: req.session.username,
      userId: req.session.userId
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