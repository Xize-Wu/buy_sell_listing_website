const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/markSold');

router.post('/', (req, res) => {
  const product_id = req.body.product_id;


    userQueries.markSold(product_id)
    .then(() => {
      res.redirect('/listings');
    })
    .catch(error => {
      console.message(error.message);
    })
});

module.exports = router;