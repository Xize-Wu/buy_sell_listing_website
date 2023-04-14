const db = require('../connection');

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

module.exports = { markSold }