const db = require('../connection');

const addBookToCart = function(user_id, product_id) {
  return db.query('INSERT INTO orders (user_id, product_id) VALUES($1, $2) returning *', [user_id, product_id])
    .then((data) => {
      data.rows[0]})
    .catch(err => console.error('query error', err.message));
};

const getCart = function(uid) {
  return db.query('SELECT orders.product_id AS product_id, products.title AS title, products.thumbnail_url AS thumbnail, (products.price/100) AS dollar FROM orders JOIN products ON orders.product_id = products.id WHERE orders.user_id = $1 AND orders.purchased = false AND orders.removed = false', [uid])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.message));
};

const checkOut = function(uid) {
  return db.query('UPDATE products JOIN orders ON products.id = orders.products_id SET products.available = false WHERE orders.user_id = $1 AND orders.removed = FALSE', [uid]
  )
    .then(db.query('UPDATE orders SET orders.purchased = true WHERE orders.user_id = $1 AND removed = FALSE'), [uid])
    .catch(err => console.error('query error', err.message));
};

//Is uid necessary?
const removeBookFromCart = function(uid, pid) {
 return db.query('UPDATE orders SET removed = TRUE WHERE user_id =$1 AND product_id=$2', [uid, pid])
};






module.exports = { addBookToCart, getCart, checkOut, removeBookFromCart};
