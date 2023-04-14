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

 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 available BOOLEAN NOT NULL DEFAULT TRUE,
 deleted BOOLEAN NOT NULL DEFAULT FALSE
);
