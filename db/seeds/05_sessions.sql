-- Fake data template
INSERT INTO sessions (customer_id, product_id, seller_id)
VALUES(1, 5, (SELECT products.user_id FROM products
      WHERE products.id = 5)),
      (3, 2, (SELECT products.user_id FROM products
      WHERE products.id = 2)),
      (2, 4, (SELECT products.user_id FROM products
      WHERE products.id = 4));