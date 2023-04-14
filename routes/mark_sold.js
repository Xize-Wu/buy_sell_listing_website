const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


router.post('/', (req, res) => {

  console.log(req.body)
  // if logged user is NOT the user who posted the item, return error
  const product_id = req.product_id;
  console.log("Product_ID", product_id);

  const adminUser_id = userQueries.getAdminUserIdWithProduct(product_id);
  console.log("adminUser_id:", adminUser_id);

  const user_id = req.session.userId;

  if (adminUser_id !== user_id) {
    const errorMessage = "User cannot mark sold";
    res.render('/', { errorMessage });
  }

  userQueries.markSold(product_id)
  .then(data => {
    const templateVars = { data }
    res.render('/', templateVars)
  })
  .catch(error => {
    console.message(error.message)
  })

  // happy path
  // SQL query to update the product so available = false
  // jQuery to show "mark as sold successful"
  res.redirect('/');
});

module.exports = router;