const express = require('express');
const userQueries = require('../db/queries/users');

// Do the cookiesession/bcrypt/salt go in this file? or in the server file?
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

// in the seed file?? to has the password! password = brcrypt.hashSync(process.env.USER1_PASSWORD, salt)
// to authenticate user with bcrypt

const samePassword = bcrypt.compareSync(password, result.password);
if (!samePassword) {
  return { error: `Password dpes not match`, user: null}
}

const router  = express.Router();

router.use(cookieParser());
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


// Log a user in
router.post('/', (req, res) => {
  const { email, password } = req.body;

  userQueries.getUserWithEmail(email)
  .then((result) => {
    const user = result.email;

    // AUTHENTICATE USER --> also have to use bcrypt, but does it go to its own helper function "authenticateUser" outside of the router?
    if (!user) {
      console.log(`Error: User doesn't exist`);
      return res.redirect('/');
    }

    if (result.password !== password) {
      console.log(`Error: Password doesn't match`);
      return res.redirect('/');
    }

    // DOES REQ.SESSION GO HERE? OR OUTSIDE OF THE userQueries portion?
    // req.session = user;
    // console.log(`what is this? REQ SESSION: `, req.session);
    res.redirect('/');
  })
  .catch((error) => {
    console.log(error.message);
    // res.status(400).send('Invalid email: ', error.message);
  })


  //// Does req session go here?
});

//Login GET route
router.get('/', (req, res) => {
  res.render('login', req);
});

module.exports = router;