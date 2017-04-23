var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var Card = require('./card');

var GenreSchema = new Schema({
  name: String,
  imgLink: String,
  audLink: String,
  colors: [String]
});

var Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
