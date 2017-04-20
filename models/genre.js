var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var Card = require('./card');

var GenreSchema = new Schema({
  genreName: String,
  background: String,
  sound: String,
  color_code: String
});

var Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
