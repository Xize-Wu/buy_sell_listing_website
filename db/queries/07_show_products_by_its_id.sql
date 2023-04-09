-- show the product being listed by itself --> when user clicks on the product and it takes them to the products/id page

SELECT users.name, title, picture_url, description, price, condition, category, products.created_at as posted_time
FROM products
JOIN users ON user_id = users.id
WHERE products.id = 1
GROUP BY users.name, title, picture_url, description, price, condition, category, posted_time;