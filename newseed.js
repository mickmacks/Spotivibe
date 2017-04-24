var db = require('./models');

var cardsList = [

  {
	  playlistName: 'Sunday Morning',
	  playlistLink: 'api/spotify/userid/uri1',
	  genre: 'Chill',
	  artistNames: ['The XX', 'James Blake', '+40…'],
	  owner: 'Erik C.'
  },
  {
	  playlistName: 'Game Night',
	  playlistLink: 'api/spotify/userid/uri2',
	  genre: 'HipHop',
	  artistNames: ['Childish Gambino', 'Kendrick Lamar', '+21…'],
	  owner: 'Joanna F.'
  },
  {
	  playlistName: 'Programming',
	  playlistLink: 'api/spotify/userid/uri3',
	  genre: 'Metal',
	  artistNames: ['Deafheaven', 'Threads', '+12…'],
	  owner: 'Iris B.'
  },
  {
	  playlistName: 'Late Night',
	  playlistLink: 'api/spotify/userid/uri4',
	  genre: 'HipHop',
	  artistNames: ['Arcade Fire', 'C418', '+33…'],
	  owner: 'Tighe C.'
  },
  {
    playlistName: 'Pot Luck',
    playlistLink: 'api/spotify/userid/uri5',
    genre: 'HipHop',
    artistNames: ['Lupe Fiasco', 'A$AP Rocky', '+20…'],
    owner: 'Nate W.'
  }


];

 var genresList = [

  {
  name: "Chill",
  imgLink: "/imgs/background1.jpg",
  audLink: "/aud/chill.mp3",
  colors: "#c0ffee"
  },
  {
  name: "HipHop",
  imgLink: "/imgs/background2.jpg",
  audLink: "/aud/hiphop.mp3",
  colors: "#00f0be"
  },
  {
  name: "Metal",
  imgLink: "/imgs/background3.jpg",
  audLink: "/aud/metal.mp3",
  colors: "#000000"
  }

 ];


db.Genre.remove({}, function(err, genres) {
  console.log('removed all genres');
  db.Genre.create(genresList, function(err, genres){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all genres');
    console.log("created", genres.length, "genres");


    db.Card.remove({}, function(err, cards){

      console.log('removed all cards');
      cardsList.forEach(function (cardData) {
        var card = new db.Card({
		  playlistName: cardData.playlistName,
		  playlistLink: cardData.playlistLink,
		  genre: cardData.genre,
		  artistNames: cardData.artistNames,
		  owner: cardData.owner
        });

        db.Genre.findOne({name: cardData.genre}, function (err, foundGenre) {
          console.log('found genre ' + foundGenre.name + ' for card ' + card.playlistName);
          if (err) {
            console.log(err);
            return;
          }
          card.genre = foundGenre;
          card.save(function(err, savedCard){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedCard.playlistName + ' with genre: ' + foundGenre.name);
          });
        });
      });

      console.log('Process complete!');

    });

  });
});