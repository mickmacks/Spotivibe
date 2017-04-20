/* CLIENT-SIDE JS */

$(document).ready(function() {

  console.log('app.js loaded!');

  // When the user loads the page, load the seed data.
  $.ajax({
    method: 'GET',
    url: '/api/cards',
    success: renderMultipleActivities
  });

  // MODAL FUNCTIONALITY
  //initialize all modals           
  $('.modal').modal();
  //or by click on trigger
  $('.trigger-modal').modal();
  //form select dropdown animation
  $('select').material_select();

  // EDIT
  // catch and handle the click on an add playlist button event
  $('#activities').on('click', '#edit-button', handleEditActivityClick);

  $('#activity-form').submit(function(e) {

    e.preventDefault();

    var formData = $(this).serializeArray();
    console.log(formData);

    $.post('/api/cards', formData, function(activity) {
      console.log('card after POST', activity);
      renderActivity(activity);  //render the server's response
    });

    $(this).trigger("reset");

  });

  //DELETE
  $('#activities').on('click', '#card-delete-button', handleDeleteCardClick);

});

////////////////////////
// DELETE ACTIVITY CARDS
////////////////////////

function handleDeleteCardClick(e) {
  e.preventDefault();
  var id = $(this).closest('.activity-card').data('card-id');  //  '.data('card-id')' is same as '<div data-card-id=' below.
  console.log(id);
  // $('div[data-album-id=' + deletedAlbumId + ']').remove();
 $.ajax({
   url: '/api/cards/' + id,
   method: 'DELETE',
   success: handleDeleteCardSuccess
 });
}  //  function handleDeleteCardClick

// callback after DELETE /api/albums/:id
function handleDeleteCardSuccess(data) {
  console.log("deleted card from buttton");
  console.log(data);
  var deletedCardId = data._id;
  console.log('removing the following Card from the page:', deletedCardId);
  $('div[data-card-id=' + deletedCardId + ']').remove();
}


////////////////////////
// EDIT ACTIVITY CARDS
////////////////////////

function handleEditActivityClick(e) {

  e.preventDefault();

  var $card = $(this).closest('.activity-card');
  var $cardId = $card.data('card-id');

  $.ajax({
    method: 'GET',
    url: '/api/cards/' + $cardId,
    success: populateEditForm
  });

}

function populateEditForm(data) {

  console.log(data);

  console.log(data.playlistName);

  var $modal = $('#modal1');

  $modal.find('#playlistName').val("" + data.playlistName);
  
  $modal.find('#genreSelect').val("" + data.genre);
  $modal.find('#playlistLink').val("" + data.playlistLink);
  $modal.find('#artistNames').val("" + data.artistNames);
  $modal.find('#owner').val("" + data.owner);


}

////////////////////////
// READ ACTIVITY CARDS
////////////////////////

// function parameter = database return object 'card'
function renderMultipleActivities(activities) {

  console.log(activities);

  activities.forEach(function(activity) {
    renderActivity(activity);
  });
}

function renderActivity(activity) {

  var activityHtml = (`

      <div data-card-id="${activity._id}" class="activity-card" class="col s12 m4">

        <div class="card-class">


          <h3 class="left-align">${activity.playlistName}</h3>
          <h5 class="left-align">${activity.genre}</h5>

        </div>

        <div><i class="material-icons medium play-icon">play_arrow</i></div>

        <div class="card-data">

            <h6 class="left-align">Songs By</h6>
            <h4 class="left-align">${activity.artistNames}</h4>

            <h6 class="left-align">Created By</h6>
            <h4 class="left-align">${activity.owner}</h4>
            
            <div class="col s12 center">
            
            <a href="#modal1" id="edit-button"><h6>EDIT</h6></a> 
            <a href="#" id="card-delete-button"><h6>DELETE</h6></a> 

            </div>

        </div>

      </div>

  `);

  $('#activity-cards-gallery').append(activityHtml);

}