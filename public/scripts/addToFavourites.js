$(document).ready(function() {

  $('.add-to-favourites').on( "click", function() {
    saveProduct(this.dataset.id);
  });
})

const saveProduct = function(productId) {
  console.log('THIS IS WHAT WE WANT!: ', productId);
$.ajax({
  type: "POST",
  url: "/favourites",
  data: {productId},
  success: function(data) {
    console.log('WE WANT DATA', data);

    const dynamicProductId = '#product-' + productId;
    $(dynamicProductId).addClass('favourite-red');
  },
});
}
