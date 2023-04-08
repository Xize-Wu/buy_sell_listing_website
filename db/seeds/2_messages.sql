-- individual messages in the sessions

CREATE TABLE messages (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
 message TEXT,
 time TIMESTAMP
);

