const db = require('../connection');

const addBookToCart = function(uid, pid){
  return db.query('INSERT INTO orders (user_id, product_id) VALUES($1, $2) returning *', [uid, pid])
  .then((data) => data.rows[0])
  .catch(err => console.error('query error', err.message));
};

const getCart = function(uid){
  return db.query('SELECT orders.product_id AS product_id, products.title AS title, products.thumnail_url AS thumbnail, (products.price/100) AS dollar FROM orders JOIN products ON orders.product_id = products.id WHERE user_id = $1 AND orders.purchased = false AND orders.deleted = false',[uid])
  .then(res => {
    const cart = res.rows
    return {
      id: cart.product_id,
      title: cart.title,
      thumbnail: cart.thumbnail,
      dollar: cart.dollar}
  })
  .catch(err => console.error('query error', err.message));
}

//return and catch needed? How to do 2 queries
const checkOut = function(oid){
  return db.query('UPDATE products JOIN orders ON products.id = orders.products_id SET products.available = false WHERE orders.id = $1', [oid]
  )
  .then(db.query('UPDATE orders SET orders ON html'))
  .then()
  .catch()
}

//Is uid necessary?
const removeBookFromCart = function(pid){

}

// const removeBookFromCart = function(uid, pid){

// }


module.exports = { addBookToCart, getCart, checkOut};
