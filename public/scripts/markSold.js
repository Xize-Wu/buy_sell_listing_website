$(document).ready(function() {

  $('#sold-button').on('click', function(event) {
    event.preventDefault();
    console.log('Sold button event called!');

    $.ajax({
      type: "POST",
      url: "/show",
    })
    .then(() => {
      $('#sold-message').text(`Item has been marked as sold!`).slideDown();
    })
  })
})