var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var Song = require('./song');

var CardSchema = new Schema({
  playlistName: String,
  playlistLink: String,
  genre: String,
  artistName: String,
  owner: String
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
