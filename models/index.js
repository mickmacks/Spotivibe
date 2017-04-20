var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/spotify");
// for heroku got to change above line
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/spotify" );

var Genre = require('./genre');

module.exports.Genre = Genre;
module.exports.Card = require('./card');
