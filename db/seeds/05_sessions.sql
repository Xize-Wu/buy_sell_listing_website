-- Fake data template
INSERT INTO sessions (customer_id, product_id, seller_id)
VALUES(5, 2, (SELECT products.user_id FROM products
      WHERE products.id = 2)),
      (1, 1, (SELECT products.user_id FROM products
      WHERE products.id = 1))