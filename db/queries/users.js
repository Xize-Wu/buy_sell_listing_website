const db = require('../connection');

const getAllProducts = (options, limit = 10) => {
  return db.query(`
  SELECT users.name, title, picture_url, price, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  GROUP BY users.name, title, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC;
  `)
  .then ((result) => {
    return result.rows;
  })
  .catch ((error) => {
    console.log(error);
  })
};

module.exports = { getAllProducts };
