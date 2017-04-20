var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Genre = require('./genre');

var CardSchema = new Schema({
  playlistName: String,
  playlistLink: String,
  genre: Genre.schema,  //  link to genre:  ${GenreSchema.genreName} ???
  artistNames: [],
  owner: String
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
