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
    .then(productsResult => {
      const user_id = req.session.userId;

      userQueries.getAllFavourites(user_id)
      .then(favourites => {
        const favouriteTracker = {};

        // { product_id: 1}
        // map between product id and favourite id.
        // we get list of products and then we get list of user favourite products
        //// combine both by assigning favourite id to product
                                                        // 1                     1
        favourites.forEach(favourite => favouriteTracker[favourite.product_id] = favourite.id)

        // cloned the product, add favourite_id key and assigning that value to key
        const products = productsResult.map(product => ({...product, favourite_id: favouriteTracker[product.id]}))

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
      })

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;