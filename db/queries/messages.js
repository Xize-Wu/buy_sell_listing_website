const db = require('../connection');

const createSession = function(uid, pid) {
  return db.query(`INSERT INTO sessions (customer_id, product_id, seller_id)
  VALUES($1, $2, (SELECT products.user_id FROM products
        WHERE products.id = $2)) returning *;`, [uid, pid])
    .then(res => {
         return res.rows[0];
        })
    .catch(err => console.error('Error with createSession', err.message));
};

const createMessage = function(sessionId, senderId, message) {
console.log('---test')
  console.log({ sessionId, senderId, message });

  return db.query (`INSERT INTO messages (session_id, sender_id, message)
  VALUES($1, $2, $3) returning *;`,[sessionId, senderId, message])
  .then(res => {
    console.log('res', res)
    return res.rows[0]
  })
  .catch(err => console.error('Error with createMessage', err.message))
};

const getSession = function(uid) {
  return db.query(`SELECT sessions.*, products.title FROM sessions
  JOIN products ON sessions.product_id = products.id WHERE CAST(customer_id AS INTEGER) = $1 OR CAST(seller_id AS INTEGER) = $1;`, [uid])
  .then(res => {
    return res.rows;
  })
    .catch(err => console.error('Error with getConversation', err.message));
};

const getConversation = function(sessionId) {
  return db.query(
    'SELECT session_id, message, sender_id, name FROM messages JOIN users ON sender_id = users.id WHERE session_id = $1 ORDER BY messages.id ASC;', [sessionId]
  )
    .then(res => {
      console.log('rows in messages', res);
      return res.rows;}
      )
    .catch(err => console.error('Error with getConversation', err.message));
};

module.exports = { createSession, createMessage, getSession, getConversation };