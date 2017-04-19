/************
 * DATABASE *
 ************/

var db = require('../models');


// GET /api/cards
function destroy(req, res) {  // delete is a reserved word !!!
  // send back all albums as JSON
  // find one card by id, delete it, and send it back as JSON
  db.Card.findOneAndRemove({ _id: req.params.cardId }, function(err, foundCard){
    console.log("you just destroyed " + foundCard + " !!!");
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundCard);
});  //   db.Card.findOne
}

// export public methods here
module.exports = {
  destroy: destroy
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
