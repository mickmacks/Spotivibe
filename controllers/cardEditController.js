/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function destroy(req, res) {  // delete is a reserved word !!!
  // find one card by id, delete it, and send it back as JSON
  console.log("cardEditController.js recieved message from delete button")
  db.Card.findOneAndRemove({ _id: req.params.cardId }, function(err, foundCard){
    console.log("you just destroyed " + foundCard + " !!!");
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundCard);
});  //   db.Card.findOneAndRemove
}


// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one card by id, update it based on request body,
  // and send it back as JSON
  console.log('updating with data', req.body);
  // db.Album.findById(req.params.albumId, function(err, foundAlbum) {
  //   if(err) { console.log('albumsController.update error', err); }
  //   foundAlbum.artistName = req.body.artistName;
  //   foundAlbum.name = req.body.name;
  //   foundAlbum.releaseDate = req.body.releaseDate;
  //   foundAlbum.save(function(err, savedAlbum) {
  //     if(err) { console.log('saving altered album failed'); }
  //     res.json(savedAlbum);
    // });
  // });
}

// export public methods here
module.exports = {
  destroy: destroy,
  // create: create
  // show: show,
  // destroy: destroy,
  update: update
};
