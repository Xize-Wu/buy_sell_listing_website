const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/markSold');


router.post('/', (req, res) => {
  // if logged user is NOT the user who posted the item, return error
  const product_id = req.body.product_id;
  console.log("Product_ID", product_id);

  userQueries.getAdminUserIdWithProduct(product_id)
  .then (result => {

    const adminUserId = result.user_id;
    console.log('THIS IS THE ADMIN USER ID!!, ', adminUserId);

    const user_id = req.session.userId;
    console.log('THIS IS THE CURRENT USER ID!: ', user_id);

    const templateVars = {
      adminUserId,
      user_id
    }

    res.render('show', templateVars);
    // LAST STEP
    // if (adminUserId !== user_id) {
    //   /// THE BUTTON SHOULD NOT SHOW UP IF THIS IS THE CASE
    // }

    // happy path
    // SQL query to update the product so available = false

    userQueries.markSold(product_id)
    .then(result => {

      console.log('THIS IS THE RESULT FROM USERQUERY: ', result);
      return result
      // const templateVars = { data }
      // res.render('show', templateVars);
    })
    .catch(error => {
      console.message(error.message)
    })
  })
  .catch (error => {
    console.log(error);
  })


  // FIRST STEP - ENSURE TABLE PRODUCTS GET UPDATED [SUCCESS]
  // STEP 2 - If updated, show "mark as sold successful"; jweury in public folder, .then(render)
  // STEP 3-  show products as "mark sold" tag if products.available = FALSE;

  res.redirect(`/show/${product_id}`);
});

module.exports = router;