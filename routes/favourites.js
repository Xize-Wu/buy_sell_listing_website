
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

// when post request made, the product gets added to the /favourites page
router.post('/', (req, res) => {
  const product_id = req.body.productId;
  const user_id = req.session.userId;

  userQueries.addProductToFavourites(user_id, product_id)
  .then(response => {
    console.log(response.rows)
    res.send(200, { message: 'ok' });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })
})

//Remove book from favourites
router.post('/remove', (req, res) => {
  console.log(req.body)
  const user_id = req.session.userId;
  const product_id = req.body.product_id;

  userQueries.removeProductFromFavourites(user_id, product_id)
  .then(response => {
    console.log(response.rows)
    res.send(200, { message: 'ok' });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })

  res.redirect('/favourites');
})

module.exports = router;