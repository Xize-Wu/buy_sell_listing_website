// Client facing scripts here
app.get("/", (req, res) => {
  userQueries
    .getAllProducts()
    .then((products) => {
      res.render('/', { products });
    })
    .catch((error) => {
      console.error(error.message);
      res.send(error);
    });
});