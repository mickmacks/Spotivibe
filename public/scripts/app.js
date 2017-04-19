/* CLIENT-SIDE JS */

$(document).ready(function() {

  console.log('app.js loaded!');

  // When the user loads the page, load the seed data.
  $.ajax({
    method: 'GET',
    url: '/',
    success: renderMultipleActivities
  });


  // HANDLE FORM SUBMISSION
  // $('#album-form form').on('submit', function(e) {
  //   e.preventDefault();
  //   var formData = $(this).serialize();
  //   console.log('formData', formData);
  //   $.post('/api/albums', formData, function(album) {
  //     console.log('album after POST', album);
  //     renderAlbum(album);  //render the server's response
  //   });
  //   $(this).trigger("reset");
  // });

  // CREATE
  // catch and handle the click on an add playlist button event
  // $('#add-activity').on('click', '.add-playlist', handleAddPlaylistClick);

  // catch and handle the click on save playlist button event
  // $('#activity-card-modal').on('click', '.save-playlist', handleSaveChangesClick);

  // PLAY 
  // catch and handle the click on play playlist button event
  // $('#activity-card').on('click', '#play-button'handleNewActivitySubmit);

  // EDIT
  // catch and handle the click on delete playlist button event
  // $('#activity-card-modal').on('click', '.edit-album', handleActivityEditClick);
  
  // DELETE
  // catch and handle the click on edit playlist button event
  // $('#activity-card-modal').on('click', '.delete-album', handleDeleteActivityClick);




});

////////////////////////
// CREATE/SAVE ACTIVITY CARDS
////////////////////////

// DISPLAY MODAL WHEN "ADD PLAYLIST" IS CLICKED

// 
// function handleAddSongClick(e) {
//   console.log('add-song clicked!');
//   var currentAlbumId = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
//   console.log('id',currentAlbumId);
//   $('#songModal').data('album-id', currentAlbumId);
//   $('#songModal').modal();  // display the modal!
// }

// WHEN USER COMMITS SAVE INSIDE PLAYLIST MODAL

// function handleNewSongSubmit(e) {
//   e.preventDefault();
//   var $modal = $('#songModal');
//   var $songNameField = $modal.find('#songName');
//   var $trackNumberField = $modal.find('#trackNumber');
//   // get data from modal fields
//   // note the server expects the keys to be 'name', 'trackNumber' so we use those.
//   var dataToPost = {
//     name: $songNameField.val(),
//     trackNumber: $trackNumberField.val()
//   };
//   var albumId = $modal.data('albumId');
//   console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id: ', albumId);
//   // POST to SERVER
//   var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
//   $.post(songPostToServerUrl, dataToPost, function(data) {
//     console.log('received data from post to /songs:', data);
//     // clear form
//     $songNameField.val('');
//     $trackNumberField.val('');

//     // close modal
//     $modal.modal('hide');
//     // update the correct album to show the new song
//     $.get('/api/albums/' + albumId, function(data) {
//       // remove the current instance of the album from the page
//       $('[data-album-id=' + albumId + ']').remove();
//       // re-render it with the new album data (including songs)
//       renderAlbum(data);
//     });
//   }).error(function(err) {
//     console.log('post to /api/albums/:albumId/songs resulted in error', err);
//   });
// }


////////////////////////
// READ ACTIVITY CARDS
////////////////////////

// function parameter = database return object 'card'
function renderMultipleActivities(card) {
  console.log('ajax success');
  // card.forEach(function(activity) {
  //   renderActivity(activity);
  // });
}

function renderActivity(activity) {

  var activityHtml = (`

      <div class="row">

      <div id="activity-card" class="col s12 m4">
      <div id="card-id">

          <h3 class="left-align">${card.playlistName}</h3>
          <h5 class="left-align">${card.genre}</h5>

          </div>

          <div id="play-button"><i class="material-icons large play-icon">play_circle_filled</i></div>

          <div id="card-data">

            <h6 class="left-align">Songs By</h6>
            <h4 class="left-align">${card.artistNames}</h4>

            <h6 class="left-align">Created By</h6>
            <h4 class="left-align">${card.owner}</h4>

          </div>

      <!-- include the iframe data -->

      </div>

  `);

  $('#activities').prepend(activityHtml);

}

////////////////////////
// EDIT ACTIVITY CARDS
////////////////////////

// function handleAlbumEditClick(e) {
//   var $albumRow = $(this).closest('.album');
//   var albumId = $albumRow.data('album-id');
//   console.log('edit album', albumId);

//   // show the save changes button
//   $albumRow.find('.save-album').toggleClass('hidden');
//   // hide the edit button
//   $albumRow.find('.edit-album').toggleClass('hidden');


//   // get the album name and replace its field with an input element
//   var albumName = $albumRow.find('span.album-name').text();
//   $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');

//   // get the artist name and replace its field with an input element
//   var artistName = $albumRow.find('span.artist-name').text();
//   $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

//   // get the releasedate and replace its field with an input element
//   var releaseDate = $albumRow.find('span.album-releaseDate').text();
//   $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>');
// }

// function handleAlbumUpdatedResponse(data) {
//   console.log('response to update', data);

//   var albumId = data._id;
//   // scratch this album from the page
//   console.log('TEEESSSTTTTTTING');
//   console.log($('[data-album-id=' + albumId + ']'));
//   // and then re-draw it with the updates ;-)
//   renderAlbum(data);

//   // BONUS: scroll the change into view ;-)
//   $('[data-album-id=' + albumId + ']').scrollIntoView();
// }

// function handleSaveChangesClick(e) {
//   var albumId = $(this).parents('.album').data('album-id'); // $(this).closest would have worked fine too
//   var $albumRow = $('[data-album-id=' + albumId + ']');

//   var data = {
//     name: $albumRow.find('.edit-album-name').val(),
//     artistName: $albumRow.find('.edit-artist-name').val(),
//     releaseDate: $albumRow.find('.edit-album-releaseDate').val()
//   };
//   console.log('PUTing data for album', albumId, 'with data', data);

//   $.ajax({
//     method: 'PUT',
//     url: '/api/albums/' + albumId,
//     data: data,
//     success: handleAlbumUpdatedResponse
//   });
// }

// function handleAlbumUpdatedResponse(data) {
//   console.log('response to update', data);

//   var albumId = data._id;
//   // scratch this album from the page
//   console.log($('[data-album-id=' + albumId + ']'));
//   // and then re-draw it with the updates ;-)
//   renderAlbum(data);

//   // BONUS: scroll the change into view ;-)
//   $('[data-album-id=' + albumId + ']').scrollIntoView();
// }


////////////////////////
// DELETE ACTIVITY CARDS
////////////////////////

// // when a delete button for an album is clicked
// function handleDeleteAlbumClick(e) {
//   var albumId = $(this).parents('.album').data('album-id');
//   console.log('someone wants to delete album id=' + albumId );
//   $.ajax({
//     url: '/api/albums/' + albumId,
//     method: 'DELETE',
//     success: handleDeleteAlbumSuccess
//   });
// }

// // callback after DELETE /api/albums/:id
// function handleDeleteAlbumSuccess(data) {
//   var deletedAlbumId = data._id;
//   console.log('removing the following album from the page:', deletedAlbumId);
//   $('div[data-album-id=' + deletedAlbumId + ']').remove();
// }







