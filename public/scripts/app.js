console.log("Sanity Check: JS is working!");

var $venturesList;
var allVentures = [];

$(document).ready(function(){

  $venturesList = $('#ventureTarget');

  $.ajax({
    method: 'GET',
    url: '/api/ventures',
    success: handleSuccess,
    error: handleError
  });

  $('#form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/ventures',
      data: $(this).serialize(),
      success: newVentureSuccess,
      error: newVentureError
    });
  });



  function getVentureHtml(venture) {
    return `<hr>
            <p>
              <b>${venture.title}</b>
              ${venture.description}
              <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${venture._id}>Delete</button>
            </p>`;
  }

  function getAllVenturesHtml(ventures) {
    return ventures.map(getVentureHtml).join("");
  }
  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post data changes
  function render () {
    // empty existing posts from view
    $venturesList.empty();

    // pass `allVentures` into the template function
    var venturesHtml = getAllVenturesHtml(allVentures);

    // append html to the view
    $venturesList.append(venturesHtml);
  }

  function handleSuccess(json) {
    allVentures.push(json);
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#ventureTarget').text('Failed to load ventures, is the server working?');
  }

  function newVentureSuccess(json) {
    $('#newVentureForm input').val('');
    allVentures.push(json);
    render();
  }

  function newVentureError() {

  }

  function deleteVentureSuccess(json) {
    var venture = json;
    var ventureId = venture._id;

    // find the venture with the correct ID and remove it from our allVentures array
    for(var index = 0; index < allVentures.length; index++) {
      if(allVentures[index]._id === ventureId) {
        allVentures.splice(index, 1);
        break;  // we found our venture - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    render();
  }

  function deleteVentureError() {

  }
});
