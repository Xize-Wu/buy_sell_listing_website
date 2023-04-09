-- show the products being listed by lowest to highest price --> this goes on the search/filtered page

SELECT user_id, title, description, picture_url, price, condition, category, products.created_at as posted_time
FROM products
JOIN users ON user_id = users.id
GROUP BY user_id, title, description, picture_url, price, condition, category, posted_time
ORDER BY price;