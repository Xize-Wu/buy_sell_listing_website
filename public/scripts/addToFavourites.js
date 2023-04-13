$(document).ready(function() {

  $('.add-to-favourites:not(.favourite-red)').on("click", function addFavourite(event) {
    const productId = this.dataset.id;

    console.log('THIS IS WHAT WE WANT!: ', productId);

    $.ajax({
      type: "POST",
      url: "/favourites",
      data: { productId },
      success: function(data) { 
        console.log('WE WANT DATA', data);

        const dynamicProductId = '#product-' + productId;
        $(dynamicProductId).addClass('favourite-red').off("click", addFavourite);
      }
    });
  });
});