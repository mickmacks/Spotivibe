/* CLIENT-SIDE JS */

$(document).ready(function() {

  console.log('app.js loaded!');

});

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