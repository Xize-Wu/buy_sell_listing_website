const express = require('express');
//const userQueries = require('../db/queries/users');
const { addBookToCart, getCart, checkOut } = require('../db/queries/checkout');
const router = express.Router();

//Add book to cart
router.post('/', (req, res) => {
  const user_id = req.session.user_id;
  const product_id = req.body.product_id;
  addBookToCart(user_id, product_id)
    .then((data) => {
      res.redirect(`/cart/${data.id}`);
      })
    .catch(error => console.error(error.message));
});

//Read cart
router.get('/:id', (req, res) => {
  const user_id = req.session.userId
  if(!user_id){
    return res.status(400).send("Error: Please log in.")
  }
  const templateVars = {
    username: req.session.userId
  };
  res.render('checkout', templateVars);
});

//delete item

//Check Out
module.exports = router;