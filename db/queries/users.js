const db = require('../connection');

const getAllProducts = (limit = 10) => {
  return db.query(`
  SELECT DISTINCT sellers.name, products.id, title, picture_url, (price/100) AS dollar, condition, category, products.created_at as posted_time
  FROM products
  JOIN users AS sellers ON user_id = sellers.id
  ORDER BY posted_time DESC
  LIMIT $1;
  `, [limit])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const getUserWithEmail = function (email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
    .then((result) => {
      return result.rows[0];
    })
    .catch(error => {
      return error;
    });
};

const storeUserInformation = function (name, email, password) {
  return db
    .query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *`
    ,[name, email, password]);
};

const getAllOrders = function(userId) {
  return db.query(`
  SELECT orders.id, orders.purchase_time, products.title, products.thumbnail_url, (products.price/100) AS dollar
  FROM orders
  JOIN products ON orders.product_id = products.id
  JOIN users ON orders.user_id = users.id
  WHERE users.id = $1 AND orders.purchased = TRUE AND orders.removed = FALSE
  ORDER BY purchase_time DESC;
  `, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const getAllFavourites = function(userId) {
  return db.query(`
  SELECT favourites.id, title, description, products.id AS product_id, picture_url, (price/100) AS dollar, condition, category
  FROM favourites
  JOIN products ON product_id = products.id
  WHERE favourites.user_id = $1
  ORDER BY favourites.created_at;
  `, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const getAllUSerListings = function(userId) {
  return db.query(`
  SELECT products.id, title, description, picture_url, (price/100) AS dollar, condition, category, user_id, products.created_at as posted_time, available
  FROM products
  JOIN users ON user_id = users.id
  WHERE users.id = $1
  ORDER BY posted_time DESC;
  `, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const searchBooksByPrice = function(options, limit = 10) {

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
  ORDER BY posted_time DESC
  LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const addProductToFavourites = function(userId, productId) {
  return db.query(`
  INSERT INTO favourites (user_id, product_id)
  VALUES ($1, $2)
  RETURNING *
  `, [userId, productId])
};

const removeProductFromFavourites = function(userId, productId) {
  return db.query(`DELETE FROM favourites
  WHERE user_id = $1
  AND product_id = $2
  `, [userId, productId])
};


const addListing = function (userId, products) {


  console.log('Adding listing with title:', products.title);
  const queryString = `
    INSERT INTO products (user_id, title, description, picture_url, thumbnail_url, price, condition, category)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`

  const values = [
    userId,
    products.title,
    products.description,
    products.image,
    products.thumbnail_image,
    products.price,
    products.bookcondition,
    products.bookcategory,
    
  ];
  console.log('Querying the database with values:', values);
  return db
    .query(queryString, values)
    .then((result) => {
      console.log('Listing added successfully:', result.rows[0]);
      return result.rows[0];
    })
    .catch((error) => {
      
      console.error(error.message);
    });
};


module.exports = { getAllProducts, getUserWithEmail, storeUserInformation, getAllOrders, getAllFavourites, getAllUSerListings, searchBooksByPrice, addProductToFavourites, removeProductFromFavourites, addListing };
