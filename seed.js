// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

// var Chill = new Genre() {

//   genreName: "Chill",
//   background: "imageURL",
//   sound: "audioURL",
//   color_code: "#00f0be"

// }

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
  genreName: "wild",
  background: "./public/imgs/background1.jpg",
  sound: "",
  color_code: "012345"
});
genreSeed.push({
  genreName: "jazz",
  background: "./public/imgs/background2.jpg",
  sound: "",
  color_code: "ABCDEF"
});
genreSeed.push({
  genreName: "OREGAMI",
  background: "./public/imgs/background3.jpg",
  sound: "",
  color_code: "091837"
});

//  this function takes in Genre with IDs, inbed one in each card object
function imbedCard (cardSeed, genres) {
  for (i=0; i<cardSeed.length; i++) {
    cardSeed[i].genre = genres[i];
  };
  return cardSeed;
  console.log("just imbedded one genreSeed into each cardSeed");
}  //  function imbedCard



//   this first creates genre objects with ids, then imbeds one in each card object going to DB
db.Genre.remove({}, function(err, genres){
  db.Genre.create(genreSeed, function(err, genres){
    if (err) { return console.log('ERROR', err); }
    console.log("all genres:", genres);
    // process.exit();   // commented out beause seened to cause problems
      var newCards = imbedCard (cardSeed, genres);

      db.Card.remove({}, function(err, cards){
        db.Card.create(cardSeed, function(err, cards){
          if (err) { return console.log('ERROR', err); }
          console.log("all cards:", cards);
          // process.exit();   // commented out beause seened to cause problems
        });  //  db.Card.create
      });  //  db.Card.remove
  });  //  db.Genre.create
});  //  db.Genre.remove

// db.Card.remove({}, function(err, cards){
//   db.Card.create(cardSeed, function(err, cards){
//     if (err) { return console.log('ERROR', err); }
//     console.log("all cards:", cards);
//     // process.exit();   // commented out beause seened to cause problems
//   });  //  db.Card.create
// });  //  db.Card.remove
