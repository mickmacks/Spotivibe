var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/spotify");
 mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/spotify" );
// for heroku got to change above line
// MONGODB_URI: mongodb://heroku_vtdsxzk7:ejqjn63i99i8k2epupm8iueafh@ds111441.mlab.com:11441/heroku_vtdsxzk7
// mongoose.connect( "mongodb://heroku_vtdsxzk7:ejqjn63i99i8k2epupm8iueafh@ds111441.mlab.com:11441/heroku_vtdsxzk7" || "mongodb://localhost/spotify" );
//  mongodb://heroku_vtdsxzk7:ejqjn63i99i8k2epupm8iueafh@ds111441.mlab.com:11441/heroku_vtdsxzk7

var Genre = require('./genre');

module.exports.Genre = Genre;
module.exports.Card = require('./card');
