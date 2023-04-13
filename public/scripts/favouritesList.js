$(document).ready(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log('Form submit event called!');

    const product_id = $(event.target).find('input')[0].value;
    // console.log(product_id);

    $.ajax({
      type: "POST",
      url: "/favourites/remove",
      data: { product_id },
      success: function(data) {
        console.log('SUCCESS RESPONSE FOR FAVOURITE REMOVE BUTTON')
        $(`div[data-product="${product_id}"]`).remove()
      }
    })
  })
})