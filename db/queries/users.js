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

const getAllOrders = function(userId) {
  return db.query(`
  SELECT orders.id, orders.purchase_time, products.title, products.picture_url, products.price
  FROM orders
  JOIN products ON orders.product_id = products.id
  JOIN users ON orders.user_id = users.id
  WHERE users.id = $1
  GROUP BY orders.id, orders.purchase_time, products.title, products.picture_url, products.price
  ORDER BY purchase_time DESC;
  `, [userId])
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error);
  })
};

const getAllFavourites = function(userId) {
  return db.query(`
  SELECT favourites.id, title, description, products.id, picture_url, price, condition, category
  FROM favourites
  JOIN products ON product_id = products.id
  WHERE favourites.user_id = $1
  GROUP BY favourites.id, title, description, products.id, picture_url, price, condition, category
  ORDER BY favourites.created_at;
  `, [userId])
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error);
  })
};

const getAllUSerListings = function(userId) {
  return db.query(`
  SELECT products.id, title, description, picture_url, price, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  WHERE users.id = $1
  GROUP BY products.id, title, description, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC;
  `, [userId])
  .then((result) => {
    return result.rows;
  })
  .catch((error) => {
    console.log(error);
  })
}

const searchBooksByPrice = function (options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT users.name, title, picture_url, (price/100) AS dollar, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  WHERE 1=1
  `;

  if (options.book_title) {
    queryParams.push(`%${options.book_title}%`);
    queryString += `AND title LIKE $${queryParams.length}`;
  }

  if (options.minimum_price) {
    queryParams.push(options.minimum_price * 100);
    queryString += `AND price >= $${queryParams.length}`;
  }

  if (options.maximum_price) {
    queryParams.push(options.maximum_price * 100);
    queryString += ` AND price <= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY users.name, title, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams, options);

  return db.query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((error) =>
      console.log(error.message));
};

module.exports = { getAllProducts, getUserWithEmail, storeUserInformation, getAllOrders, getAllFavourites, getAllUSerListings, searchBooksByPrice };
