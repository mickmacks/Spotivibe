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

db.Card.remove({}, function(err, cards){

  db.Card.create(cardSeed, function(err, cards){
    if (err) { return console.log('ERROR', err); }
    console.log("all cards:", cards);
    // console.log("created", albums.length, "albums");
    process.exit();
  });  //  db.Card.create

});  //  db.Card.remove
