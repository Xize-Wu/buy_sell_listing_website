CREATE TABLE favourites (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 product_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 created_at TIMESTAMP NOT NULL
);
