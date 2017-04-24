/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/genres   from server.js
function index(req, res) {
  // send back all genres as JSON
  db.Genre.find({}, function(err, allGenres) {
    console.log("all genres (from controller) ", allGenres);
    return res.json(allGenres);  // need 'return'
  });  //    db.Card.find
} //  function index

// export public methods here
module.exports = {
  index: index
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
