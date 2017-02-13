console.log("Sanity Check: JS is working!");
var template;
var $venturesList;
var allVentures = [];

$(document).ready(function(){

  $venturesList = $('#ventureTarget');

  $.ajax({
    method: 'GET',
    url: 'https://young-gorge-60197.herokuapp.com/api/',
    success: handleSuccess,
    error: handleError
  });

  $('#newVentureForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'https://young-gorge-60197.herokuapp.com/api/',
      data: $(this).serialize(),
      success: newVentureSuccess,
      error: newVentureError
    });
  });

  $venturesList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: 'https://young-gorge-60197.herokuapp.com/api/'+$(this).attr('data-id'),
      success: deleteVentureSuccess,
      error: deleteVentureError
    });
  });

});

function getVentureHtml(venture) {
  return `<hr>
          <p>
            <b>${venture.title}</b>
            by ${venture.description}
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

  // pass `allBooks` into the template function
  var venturesHtml = getAllVenturesHtml(allVentures);

  // append html to the view
  $venturesList.append(venturesHtml);
}

function handleSuccess(json) {
  allVentures = json;
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

  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allVentures.length; index++) {
    if(allVentures[index]._id === ventureId) {
      allVentures.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteVentureError() {

}
