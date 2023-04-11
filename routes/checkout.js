const express = require('express');
const router = express.Router();
const { checkOut } = require('../db/queries/checkout');

//Check Out
router.post('/', (req, res) => {
  const uid = req.session.userId;
  console.log("uid", uid)
  if (!uid) {
    return res.status(400).send("Error: Please log in.");
  }
  checkOut(uid)
  .then((response) =>{
    console.log('response', response)
    res.redirect('/orders')
  });
});

module.exports = router;