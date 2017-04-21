var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Genre = require('./genre');

// this is linking tables by embedding method
// var CardSchema = new Schema({
//   playlistName: String,
//   playlistLink: String,
//   genre: Genre.schema,  //  link to genre:  ${GenreSchema.genreName} ???
//   artistNames: [],
//   owner: String
// });

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
