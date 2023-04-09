-- show the products being listed by descending order --> this goes on the featured page

SELECT user_id, title, description, picture_url, price, condition, category, products.created_at as posted_time
FROM products
JOIN users ON user_id = users.id
GROUP BY user_id, title, description, picture_url, price, condition, category, posted_time
ORDER BY posted_time DESC;