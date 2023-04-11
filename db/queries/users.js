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
  SELECT users.name, title, picture_url, price, condition, category, products.created_at as posted_time
  FROM products
  JOIN users ON user_id = users.id
  `;

  if (options.book_title) {
    queryParams.push(`%${options.book_title}%`);
    queryString += `WHERE title LIKE $${queryParams.length}`;
  }

  if (options.minimum_price) {
    queryParams.push(options.minimum_price);
    queryString += ` AND price >= $${queryParams.length}`;
  }

  if (options.maximum_price) {
    queryParams.push(options.minimum_price);
    queryString += ` AND price <= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY users.name, title, picture_url, price, condition, category, posted_time
  ORDER BY posted_time DESC
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return db.query(queryString, queryParams)
    .then((result) => {
      console.log(result);
      console.log(`ROWS ONLY THIS IS ROWS ONLY I AM PRINTING ROWS: `, result.rows)
      return result;
    })
    .catch((error) =>
      console.log(error));
};

module.exports = { getAllProducts, getUserWithEmail, storeUserInformation, searchBooksByPrice };
