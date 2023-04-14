const db = require('../connection');

// Delete from listing
const deleteProductFromListings = function(productId) {
  return db.query(`DELETE FROM products
  WHERE id = $1;
  `, [productId])
};

module.exports = { deleteProductFromListings };