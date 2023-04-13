const db = require('../connection');


// works in the terminal
const getAdminUserIdWithProduct = function(productId) {
  return db.query(`SELECT user_id FROM products WHERE id = $1`, [productId])
  .then((result) => {

    // console.log('THIS IS THE USERID WE WANT!!!:', result.rows[0]);
    return result.rows[0];
  })
  .catch((error) => {
    console.error(error.message);
  })
};

// Need to test this!!
const markSold = function(productId) {
  return db.query(`
  UPDATE products
  SET available = FALSE
  WHERE id = $1
  RETURNING *
  `, [productId])
  .then((result) => {
    return result.rows[0];
  })
  .catch((error) => {
    console.error(error.message)
  })
};

module.exports = {getAdminUserIdWithProduct, markSold}


/**'UPDATE products SET available = FALSE FROM products as prods
 * JOIN orders ON prods.id = orders.product_id
 * WHERE (orders.user_id = $1 AND orders.purchased = FALSE AND orders.removed = FALSE) returning *' */