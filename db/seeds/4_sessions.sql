DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
 id SERIAL PRIMARY KEY NOT NULL,
 customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
 product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
 seller_id TEXT
);

-- Fake data template
INSERT INTO sessions (customer_id, product_id, seller_id)
VALUES(1, 5, (SELECT products.user_id FROM products
WHERE products.id = 5));

