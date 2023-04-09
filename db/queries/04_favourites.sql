-- Show a list of products that the user saved as favourites --> goes on the favourites page

SELECT favourites.id, title, description, products.id, thumbnail_url, price, condition, category
FROM favourites
JOIN products ON product_id = products.id
GROUP BY favourites.id, title, description, products.id, thumbnail_url, price, condition, category
ORDER BY favourites.created_at;