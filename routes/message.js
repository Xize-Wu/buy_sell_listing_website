const express = require('express');
const router = express.Router();
const { createSession, createMessage, getSession, getConversation } = require('../db/queries/messages');

//Create new session
router.post('/', (req, res) => {
  console.log(req);
  res.render("message_box");
});

//Send new message
router.post('/:id', (req, res) => {
  console.log(req);
  res.redirect('/');
});

//Load message session page
router.get('/', (req, res) => {
  const uid = req.session.userId;
  getSession(uid)
    .then(data => {
      res.render("message_box", { data });
    });
});

//Load the individual message session page
router.get('/:id', (req, res) => {
  getConversation(req.params.id)
    .then(data => {
      console.log(data);
      res.render("message", { data });
    });
});

module.exports = router;