var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/spotify");
// for heroku got to change above line

var Genre = require('./genre');

module.exports.Genre = Genre;
module.exports.Card = require('./card');
