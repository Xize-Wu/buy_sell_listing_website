const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getAllProducts = (options, limit = 10) => {
  return pool.query(`
  SELECT users.name, title, picture_url, price, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  GROUP BY users.name, title, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC;
  `)
  .then ((result) => {
    console.log(result);
    return result;
  })
  .catch ((error) => {
    console.log(error);
  })
};

module.exports = { getUsers, getAllProducts };
