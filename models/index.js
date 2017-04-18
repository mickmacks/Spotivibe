var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/spotify");

var Genre = require('./genre');

module.exports.Genre = Genre;
module.exports.Card = require('./card');
