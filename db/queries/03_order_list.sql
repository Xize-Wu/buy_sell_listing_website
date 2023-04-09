-- show list of orders for users who already purchased the products, this should appear on their order history page

SELECT users.name, products.title, products.price, purchase_time
FROM orders
JOIN users ON user_id = users.id
JOIN products ON product_id = products.id
GROUP BY users.name, products.title, products.price, purchase_time
ORDER BY purchase_time DESC;