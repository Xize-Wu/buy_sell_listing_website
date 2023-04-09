-- show list of messages by session_id for each user --> goes on the sessions page

SELECT sessions.id, products.title, sessions.customer_id, users.name as customer_name, sessions.seller_id, messages.id, messages.created_at as message_time_sent
FROM sessions
JOIN messages ON session_id = sessions.id
JOIN products ON product_id = products.id
JOIN users ON user_id = users.id
GROUP BY sessions.id, products.title, sessions.customer_id, customer_name, sessions.seller_id, messages.id
ORDER BY message_time_sent;