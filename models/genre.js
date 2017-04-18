var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Card = require('./card');

var GenreSchema = new Schema({
  genreName: String,
  background: String
});

var Genre = mongoose.model('genre', GenreSchema);

module.exports = Genre;
