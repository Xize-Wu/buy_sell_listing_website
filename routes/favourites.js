
const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Favourites page route
router.get('/', (req, res) => {
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

module.exports = router;