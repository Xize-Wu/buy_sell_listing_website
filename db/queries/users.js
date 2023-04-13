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
  VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
};

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

const addListing = function (userId, products) {

  console.log('Adding listing with title:', products.title);
  const queryString = `
    INSERT INTO products (title, description, picture_url, thumbnail_url, price, condition, category)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;

  const values = [
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

module.exports = { getAllProducts, getUserWithEmail, storeUserInformation, searchBooksByPrice, addListing };
