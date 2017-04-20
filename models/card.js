var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Genre = require('./genre');

var CardSchema = new Schema({
  playlistName: String,
  playlistLink: String,
  genre: String,
  artistNames: [String],
  owner: String
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
