const db = require('../connection');

const getBookById = (id) => {
  return db.query('SELECT products.id AS id, users.username as seller, title, description, picture_url, (price / 100) AS dollar, condition, category FROM products JOIN users ON products.user_id = users.id WHERE products.id = $1',[id])
    .then(res => {
        const book = res.rows[0];
        return {
          id: book.id,
          seller: book.seller,
          title: book.title,
          description: book.description,
          pictureUrl: book.picture_url,
          price: book.dollar,
          condition: book.condition,
          category: book.category
        };
    })
    .catch(err => console.error('query error', err.message));
};

module.exports = { getBookById };