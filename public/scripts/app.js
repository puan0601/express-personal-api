console.log("Sanity Check: JS is working!");

var allVentures = [];
$(document).ready(function(){
  var $venturesList = $('#ventureTarget');

  $.ajax({
    method: 'GET',
    url: '/api/ventures',
    success: initialLoadSuccess,
    error: handleError
  });

  $('#form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/ventures',
      data: $(this).serialize(),
      success: newVentureSuccess,
      error: handleError
    });
  });

  function initialLoadSuccess(json) {
    allVentures = json;
    render();
  }

  function render() {
    // empty existing posts from view
    $venturesList.empty();

    // helper function to render all posts to view
    // note: we empty and re-render the collection each time our post data changes
    function getVenturesHtml() {
      return allVentures.map(getVentureHtml).join("");
    }

    // pass `allVentures` into the template function
    var venturesHtml = getVenturesHtml();

    // append html to the view
    $venturesList.append(venturesHtml);
  }
  function getVentureHtml(venture) {
    return `<hr>
            <p>
              <b>${venture.title}</b>
              ${venture.description}
              <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${venture._id}>Delete</button>
            </p>`;
  }



  function handleError(e) {
    console.log('uh oh');
    $('#ventureTarget').text('Failed to load ventures, is the server working?');
  }

  function newVentureSuccess(json) {
    $('input').val('');
    allVentures.push(json);
    render();
  }
});
