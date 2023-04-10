const db = require('../connection');

const getAllProducts = (options, limit = 10) => {
  return db.query(`
  SELECT users.name, title, picture_url, price, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  GROUP BY users.name, title, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC;
  `)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserWithEmail = function(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
    .then((result) => {
      return result.rows[0];
    })
    .catch(error => {
      return error;
    });
};

const storeUserInformation = function(name, email, password) {
  return db
    .query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
};

// Retrieve orders table
// -- show list of orders for users who already purchased the products, this should appear on their order history page

// SELECT users.name, products.title, products.price, purchase_time
// FROM orders
// JOIN users ON user_id = users.id
// JOIN products ON product_id = products.id
// GROUP BY users.name, products.title, products.price, purchase_time
// ORDER BY purchase_time DESC;

module.exports = { getAllProducts, getUserWithEmail, storeUserInformation };
