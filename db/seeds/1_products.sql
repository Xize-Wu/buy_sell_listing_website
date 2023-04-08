-- Create the product table and list fake products
-- Conditions: new; very good; good; fair; poor
-- Categories: fantasy; science fiction; romance; auto-biography; health

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

 title VARCHAR(255) NOT NULL,
 description TEXT,
 picture_url VARCHAR(255) NOT NULL,
 thumbnail_url VARCHAR(255) NOT NULL,
 price INTEGER  NOT NULL DEFAULT 0,
 condition VARCHAR(255) NOT NULL,
 category VARCHAR(255) NOT NULL,

 created_at TIMESTAMP,
 available BOOLEAN NOT NULL DEFAULT TRUE,
 deleted BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO products (user_id, title, picture_url, thumbnail_url, price, condition, category, created_at)
VALUES (2, 'The Name of the Wind', 'https://i.imgur.com/???.png', 'https://i.imgur.com/???.png', 1500, 'new', 'fantasy', '2023-04-01');
INSERT INTO products (user_id, title, picture_url, thumbnail_url, price, condition, category, created_at)
VALUES (2, 'The Way of Kings', 'https://i.imgur.com/???.png', 'https://i.imgur.com/???.png', 1000, 'good', 'fantasy', '2023-01-02');
INSERT INTO products (user_id, title, picture_url, thumbnail_url, price, condition, category, created_at)
VALUES (4, '1984', 'https://i.imgur.com/???.png', 'https://i.imgur.com/???.png', 2000, 'very good', 'science fiction', '2023-02-19');
INSERT INTO products (user_id, title, picture_url, thumbnail_url, price, condition, category, created_at)
VALUES (4, 'The Duke and I', 'https://i.imgur.com/???.png', 'https://i.imgur.com/???.png', 2000, 'fair', 'romance', '2023-02-15');
INSERT INTO products (user_id, title, picture_url, thumbnail_url, price, condition, category, created_at)
VALUES (4, 'My Life in Red and White', 'https://i.imgur.com/???.png', 'https://i.imgur.com/???.png', 1350, 'poor', 'auto-biography', '2023-02-05');
