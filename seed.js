// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var cardSeed =[];
cardSeed.push({
  playlistName: 'Sunday Morning',
  playlistLink: 'api/spotify/userid/uri1',
  genre: 'Chill',
  artistNames: ['The XX', ' M83', ' +40…'],
  owner: 'Erik C.'
});
cardSeed.push({
  playlistName: 'Game Night',
  playlistLink: 'api/spotify/userid/uri2',
  genre: 'HipHop',
  artistNames: ['Kendrick Lamar', ' +21…'],
  owner: 'Joanna F.'
});
cardSeed.push({
  playlistName: 'Programming',
  playlistLink: 'api/spotify/userid/uri3',
  genre: 'Metal',
  artistNames: ['GYBE', ' Threads', ' +12…'],
  owner: 'Iris B.'
});
cardSeed.push({
  playlistName: 'Up Late',
  playlistLink: 'api/spotify/userid/uri4',
  genre: 'Chill',
  artistNames: ['Arcade Fire', ' C418', ' +33…'],
  owner: 'Tighe C.'
});
cardSeed.push({
  playlistName: 'Pot Luck',
  playlistLink: 'api/spotify/userid/uri5',
  genre: 'HipHop',
  artistNames: ['Frank Ocean', ' +20…'],
  owner: 'Nate W.'
});


var genreSeed =[];
genreSeed.push({
  name: "Chill",
  imgLink: "/imgs/background1.jpg",
  audLink: "/aud/chill.mp3",
  colors: "#c0ffee"
});
genreSeed.push({
  name: "HipHop",
  imgLink: "/imgs/background2.jpg",
  audLink: "/aud/hiphop.mp3",
  colors: "#00f0be"
});
genreSeed.push({
  name: "Metal",
  imgLink: "/imgs/background3.jpg",
  audLink: "/aud/metal.mp3",
  colors: "#000000"
});
genreSeed.push({
  name: "Chill",
  imgLink: "/imgs/background1.jpg",
  audLink: "/aud/hiphop.mp3",
  colors: "#00f0be"
});
genreSeed.push({
  name: "HipHop",
  imgLink: "/imgs/background2.jpg",
  audLink: "/aud/hiphop.mp3",
  colors: "#00f0be"
});



//  this function takes in Genre with IDs, embed one in each card object
function embedCard (cardSeed, genres) {
  for (i=0; i<cardSeed.length; i++) {
    cardSeed[i].genre = genres[i];
  };
  return cardSeed;
  console.log("just embedded one genreSeed into each cardSeed");
}  

//   this first creates genre objects with ids, then embeds one in each card object going to DB
db.Genre.remove({}, function(err, genres){
  db.Genre.create(genreSeed, function(err, genres){
    if (err) { return console.log('ERROR', err); }
      var newCards = embedCard (cardSeed, genres);

      db.Card.remove({}, function(err, cards){
        db.Card.create(newCards, function(err, cards){
          if (err) { return console.log('ERROR', err); }
          console.log("all cards:", cards);
        }); 
      }); 
  });
});
