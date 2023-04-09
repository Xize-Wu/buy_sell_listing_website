-- show list of messages by session_id for each user --> goes on the sessions page

SELECT session_id, products.title, users.name as customer_name, seller_id, messages.id, messages.message, messages.created_at as message_time_sent
FROM sessions
JOIN messages ON session_id = sessions.id
JOIN products ON product_id = products.id
JOIN users ON user_id = users.id
GROUP BY session_id, products.title, customer_name, seller_id, messages.id, messages.message
ORDER BY message_time_sent;