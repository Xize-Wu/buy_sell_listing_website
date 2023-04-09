// Client facing scripts here
$(() => {
  const $productListings = $(`
  <section class="product-listings" id="product-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$productListings = $productListings;

  window.productListings = {};

  function addListing(listing) {
    $productListings.append(listing);
  }
  function clearListings() {
    $productListings.empty();
  }
  window.productListings.clearListings = clearListings;

  function addProducts(products) {
    clearListings();
    for (const productId in products) {
      const product = products[product];
      const listing = $productListings.createListing($productListings);
      addListing(listing);
    }
  }
  window.productListings.addProperties = addProperties;
});
// HEADER

