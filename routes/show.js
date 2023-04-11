const express = require('express');
const router = express.Router();
const { getBookById } = require('../db/queries/getBookById');

router.get('/:id', (req, res) => {
// coming from the url>> params; form>>body
  getBookById(req.params.id)
    .then(data => {
      return res.render("show", data);
    })
    .catch(err => console.error(err.message));
});

module.exports = router;

//render the ejs template in the backend
//get show.js script work << Do a console.log in the template
//clean up the .env file