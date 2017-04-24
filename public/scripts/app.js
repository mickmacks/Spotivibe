/* CLIENT-SIDE JS */

var editMode = false;
var editId = 0;

var audio;

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

  // PLAY
  // catch and handle the click on a play playlist button event
  $('#activities').on('click', '.play-icon', handlePlayButtonClick);

  // SUBMIT / SAVE
  // catch and handle the click on an add/save playlist submit button event
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

        var formData = $(this).serialize();
        console.log(formData);

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

// AFTER EDIT BUTTON CLICK

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
  $modal.find('#genreSelect').val("" + data.genre.name);
  $modal.find('#playlistLink').val("" + data.playlistLink);
  $modal.find('#artistNames').val("" + data.artistNames);
  $modal.find('#owner').val("" + data.owner);

  $modal.find('#submit-btn').attr('id', 'edit-submit-btn');
  // $modal.find('#activity-form').attr('id', 'edit-activity-form');



}

// AFTER SAVE CHANGES CLICK

function handleCardUpdatedResponse(data) {
  console.log('response to update', data);

  var edittedCard = $('#activities').find("[data-card-id='" + editId + "']");
  edittedCard.find('.cardPlaylistName').html(data.playlistName);
  edittedCard.find('.cardGenre').html(data.genre.name);
  edittedCard.find('.cardArtists').html(data.artistNames);
  edittedCard.find('.cardOwner').html(data.owner);

}


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

      <div data-card-id="${activity._id}" class="col s12 m6 l4 activity-card">

        <div class="card-class">

          <h3 class="cardPlaylistName left-align">${activity.playlistName}</h3>
          <h5 class="cardGenre left-align">${activity.genre.name}</h5>

        </div>

        <div class="track-icon"><i class="material-icons medium play-icon">play_arrow</i></div>

        <div class="card-data">

            <h6 class="left-align">Songs By</h6>
            <h4 class="cardArtists left-align">${activity.artistNames}</h4>

            <h6 class="left-align">Created By</h6>
            <h4 class="cardOwner left-align">${activity.owner}</h4>
            
            <div class="center">
            
            <a href="#modal1" id="edit-button"><h6>EDIT</h6></a> 
            <a href="#" id="card-delete-button"><h6>DELETE</h6></a> 

            </div>

        </div>

        <img src=${activity.genre.imgLink} class='hide card-img'>
        <audio src=${activity.genre.audLink} class='hide card-audio'>

      </div>

  `);

  $('#activity-cards-gallery').append(activityHtml);

}


////////////////////////
// PLAY & PAUSE BUTTONS
////////////////////////

function handlePlayButtonClick(e) {

  console.log(this.closest('.activity-card'));

  // HEADER IMAGE

  var clickedCard = this.closest('.activity-card');
  var clickedCardImg = clickedCard.getElementsByTagName('img')[0];
  var clickedCardSrc = clickedCardImg.src;

  var headerImage = document.getElementById('index-banner');
  headerImage.style.backgroundImage = `url('` + clickedCardSrc + `')`;

  // AUDIO

  var clickedCardAudio = clickedCard.getElementsByTagName('audio')[0];
  var clickedCardAudioTrack = clickedCardAudio.src;
  
  audio = new Audio(`` + clickedCardAudioTrack);
  audio.pause();
  audio.play();

  $('html, body').animate({ scrollTop: 0 }, 'fast');

}

// PAUSE AUDIO

// function handlePauseButtonClick(e) {

//   var clickedCard = this.closest('.activity-card');
//   var clickedCardAudio = clickedCard.getElementsByTagName('audio')[0];
//   var clickedCardAudioTrack = clickedCardAudio.src;
  
//   audio = new Audio(`` + clickedCardAudioTrack);
//   audio.pause();

// }
