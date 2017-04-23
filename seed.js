// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var cardSeed =[];
cardSeed.push({
  playlistName: "Moody!",
  playlistLink: "URL.dude",
  genre: "wild",
  artistNames: ["Tivo", "Doug"],
  owner: "Mike"
});
cardSeed.push({
  playlistName: "Smoooothe",
  playlistLink: "URL.dude2",
  genre: "jazz",
  artistNames: ["Blue Lights"],
  owner: "Robert Redford"
});
cardSeed.push({
  playlistName: "Chill",
  playlistLink: "URL.dude3",
  genre: "OREGAMI",
  artistNames: ["The XX"],
  owner: "DJ Khalid"
});

var genreSeed =[];
genreSeed.push({
  name: "Chill",
  imgLink: "/imgs/background1.jpg",
  audLink: "/aud/chill.mp3",
  colors: "#012345"
});
genreSeed.push({
  name: "Metal",
  imgLink: "/imgs/background2.jpg",
  audLink: "/aud/metal.mp3",
  colors: "#ABCDEF"
});
genreSeed.push({
  name: "HipHop",
  imgLink: "/imgs/background3.jpg",
  audLink: "/aud/hiphop.mp3",
  colors: "#091837"
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
