-- show the products being listed by descending order for each user --> this goes on the user's listing page

SELECT users.id, title, description, picture_url, price, condition, category, products.created_at as posted_time
FROM products
JOIN users ON user_id = users.id
WHERE users.id = 2;
GROUP BY users.id, title, description, picture_url, price, condition, category, posted_time
ORDER BY posted_time DESC;