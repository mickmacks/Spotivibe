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
  genre: "chill",
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

db.Genre.remove({}, function(err, genres){
  db.Genre.create(cardSeed, function(err, genres){
    if (err) { return console.log('ERROR', err); }
    console.log("all genres:", genres);
    process.exit();
  });  //  db.Genre.create
});  //  db.Genre.remove

db.Card.remove({}, function(err, cards){
  db.Card.create(cardSeed, function(err, cards){
    if (err) { return console.log('ERROR', err); }
    console.log("all cards:", cards);
    process.exit();
  });  //  db.Card.create
});  //  db.Card.remove
