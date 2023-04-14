const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/deleteListing');


//Delete book from listings
router.post('/', (req, res) => {
  console.log(req.body)

  const product_id = req.body.product_id;

  userQueries.deleteProductFromListings(product_id)
  .then(response => {
    console.log(response.rows)
    res.send(200, { message: 'ok' });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })

  res.redirect('/listings');
})

module.exports = router;