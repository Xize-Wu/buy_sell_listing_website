const express = require('express');
const router = express.Router();
const { createSession, createMessage, getSession, getConversation } = require('../db/queries/messages');

//Create new session
router.post('/', (req, res) => {
  const uid = req.session.userId;
  const pid = req.body.product_id;
  if (!uid) {
    return res.status(400).send("Error: Must be logged in to send a message.");
  }
  createSession(uid, pid)
    .then(res.render("message"))
    .catch(err => (console.error("Cannot create new session", err)));

});


//Send new message
router.post('/:id', (req, res) => {
  const uid = req.session.userId;
  const text = req.body.message_text
  console.log('req.params.id in post', req.params.id)
  if (!uid) {
    return res.status(400).send("Error: Must be logged in to send a message.");
  }
  createMessage(req.params.id, uid, text).then((result) => {
    return res.redirect(`/message/${result.session_id}`);
  })
});

//Load message session page
router.get('/', (req, res) => {
  const uid = req.session.userId;
  if (!uid) {
    return res.status(400).send("Error: Must be logged in to send a message.");
  }
  getSession(uid)
    .then(data => {
      res.render("message_box", { data });
    })
    .catch(err => (console.error("Cannot load session", err)));
});

//Load the individual message session page
router.get('/:id', (req, res) => {
  const uid = req.session.userId;
  if (!uid) {
    return res.status(400).send("Error: Must be logged in to send a message.");
  }
  getConversation(req.params.id)
    .then(data => {
      res.render("message", { data });
    })
    .catch(err => (console.error("Cannot get existing conversation", err)));
});

module.exports = router;