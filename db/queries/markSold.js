const db = require('../connection');

const getAdminUserIdWithProduct = function(productId) {
  return db.query(`SELECT user_id FROM products WHERE id = $1`, [productId])
  .then((result) => {
    console.log('THIS IS THE USERID WE WANT!!!:', result);
    return result;
  })
  .catch((error) => {
    console.error(error.message);
  })
}

const markSold = function(productId) {
  return db.query(`
  UPDATE products SET available = FALSE
  FROM products
  JOIN users ON users.id = products.user_id
  WHERE id = $1
  `, [productId])
  .then((result) => {
    console.log(result)
    console.log('THIS IS THE ROWS', result.rows)
    return result;
  })
  .catch((error) => {
    console.error(error.message)
  })
};

module.exports = {getAdminUserIdWithProduct, markSold}


/**'UPDATE products SET available = FALSE FROM products as prods
 * JOIN orders ON prods.id = orders.product_id
 * WHERE (orders.user_id = $1 AND orders.purchased = FALSE AND orders.removed = FALSE) returning *' */