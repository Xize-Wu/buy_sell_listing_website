const express = require('express');
const { addBookToCart, getCart, removeBookFromCart } = require('../db/queries/checkout');
const router = express.Router();

//Add book to cart
router.post('/', (req, res) => {
  const user_id = req.session.userId;
  const product_id = req.body.product_id;
  addBookToCart(user_id, product_id)
    .then((data) => {
      res.redirect(`/cart`);
    })
    .catch(error => console.error(error.message));
});

//Read cart
router.get('/', (req, res) => {
  const user_id = req.session.userId;
  if (!user_id) {
    return res.status(400).send("Error: Please log in.");
  }
  getCart(user_id)
    .then(data => {
      const templateVars = { data }
      res.render('checkout', templateVars);
    })
    .catch(error => {
      console.error(error.message);
    })
});

//Remove book from cart
router.post('/remove', (req, res) => {
  const uid = req.session.userId;
  const pid = req.body.product_id;
  if (!uid) {
    return res.status(400).send("Error: Please log in.");
  }
  removeBookFromCart(uid,pid)
  .then(response => {
    console.log(response.rows)
    res.send(200, { message: 'ok' });
  })
  .catch(error => {
    console.error(error.message);
  })
  res.redirect('/cart');
})

module.exports = router;