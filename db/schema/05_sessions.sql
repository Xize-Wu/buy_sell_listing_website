DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
 id SERIAL PRIMARY KEY NOT NULL,
 customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
 seller_id TEXT
);

-- SELECT * FROM messages LEFT JOIN sessions
-- ON messages.session_id = session.id
--ALL THE MESSAGES FOR THE SESSION

