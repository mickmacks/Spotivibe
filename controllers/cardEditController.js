/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function delete(req, res) {
  // send back all albums as JSON
  console.log("you just destroyed " + req + " !!!");
  // find one card by id, delete it, and send it back as JSON
  // db.Album.findOneAndRemove({ _id: req.params.cardId }, function(err, foundCard){
  //   // note you could send just send 204, but we're sending 200 and the deleted entity
  //   res.json(foundCard);
}
