/* CLIENT-SIDE JS */

var editMode = false;
var editId = 0;

$(document).ready(function() {

  console.log('app.js loaded!');

  // When the user loads the page, load the seed data.
  $.ajax({
    method: 'GET',
    url: '/api/cards',
    success: renderMultipleActivities
  });

  // trying to get genre data
  $.ajax({
    method: 'GET',
    url: '/api/genres',
    success: tryGetGenre
  });

  function tryGetGenre(data) {
    console.log("genre data from app.js");
    console.log(data);
  }


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

  $('#activities').on('click', '.play-icon', handlePlayButtonClick);

  $('#activity-form').submit(function(e) {

    e.preventDefault();

      if (editMode === false) {

        console.log('clicked original post form');

        var formData = $(this).serializeArray();
        console.log("app.js/edit/serializeArray")
        console.log(formData);

        $.post('/api/cards', formData, function(activity) {
          console.log('card after POST', activity);
          renderActivityEdit(activity);  //render the server's response
        });

        $(this).trigger("reset");

      } else {

        console.log('clicked edit post form');

        var formData = $(this).serializeArray();
        console.log("from app.js/edit");
        console.log("formData");

        var $card = $(this).closest('.activity-card');
        var $cardId = $card.data('card-id');

        $.ajax({
          method: 'PUT',
          url: '/api/cards/' + editId,
          data: formData,
          success: handleCardUpdatedResponse
        });

        $(this).trigger("reset");

        editMode = false;

      }

    });

  //DELETE
  $('#activities').on('click', '#card-delete-button', handleDeleteCardClick);

});


function handleCardUpdatedResponse(data) {
  console.log('response to update', data);
}

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
  console.log("just clicked Edit button");

  editMode = true;

  e.preventDefault();

  var $card = $(this).closest('.activity-card');
  var $cardId = $card.data('card-id');
  //  here i am trying to find data from genre table - mjl
  // var $activitiesContainer = $(this).closest('.activities');
  // var $genreFind = $activitiesContainer.data('.activities');
  // var $genreFind = db.genres.find();

  editId = $cardId;

  $.ajax({
    method: 'GET',
    url: '/api/cards/' + $cardId,
    success: populateEditForm
  });

  // copying formData from example in edit/$.post
  // var formData = $(this).serializeArray();
  // console.log(formData);

  $.get('/api/genres',  function(activity) {
  // $.get('/api/genres', formData, function(activity) {
    console.log('all genre data from app.js/edit ', activity);
    renderActivityEdit(activity);  //render the server's response
  });

  // now try to get all genre data
  $.ajax({
    method: 'GET',
    url: '/api/genres/' ,
    success: printGenres
  });
}

// now try to get all genre data
function printGenres(data) {
  console.log("all genre data? from app.js/Edit");
  console.log(data);
  // find genre name
  // console.log("playlist name is: ")
  // console.log(data.playlistName);
  // var genreNameTest = data.genre.genreName;
  // console.log("the genre is: ");
  // console.log(genreNameTest);
  // console.log("all genre info is:");
  // console.log($genreFind);
}


function populateEditForm(data) {
  console.log("data from Edit/$.ajax/ /api/cards/ + $cardId")
  console.log(data);

  var $modal = $('#modal1');

  $modal.find('#playlistName').val("" + data.playlistName);
  // $modal.find('#genreSelect').val("" + data.genre);
  $modal.find('#playlistLink').val("" + data.playlistLink);
  $modal.find('#artistNames').val("" + data.artistNames);
  $modal.find('#owner').val("" + data.owner);

  $modal.find('#submit-btn').attr('id', 'edit-submit-btn');
  // $modal.find('#activity-form').attr('id', 'edit-activity-form');



}

// function handleEditSubmitForm() {

//   console.log('Clicked Submit button after Edit button');

//   $('#activity-form').submit();

//   // $.ajax({
//   //   method: 'PUT',
//   //   url: '/api/albums/' + $cardId,
//   //   data: data,
//   //   success: handleAlbumUpdatedResponse
//   // });

// }

////////////////////////
// READ ACTIVITY CARDS
////////////////////////

// function parameter = database return object 'card'
function renderMultipleActivities(activities) {

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


////////////////////////
// PLAY BUTTON
////////////////////////


function handlePlayButtonClick(e) {

  console.log('Hello');


// check to see what genre was selected

// if genre was chill

  // change the background image
  // play different audio
  // animate something
  // scroll to top

// if genre was metal

  // change the background image
  // play different audio
  // animate something
  // scroll to top

// if genre was hiphop

  // change the background image
  // play different audio
  // animate something
  // scroll to top

}
